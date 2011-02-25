
# Point SOURCE_PATH to the src directory
# This is the directory that gets created when you get local copy of 
# Git repo from GitHub, using, 
# $ git clone git@github.com:strandls/augmentedmaps.git
SOURCE_PATH = /home/rahul/r/augmentedmaps

# DEPLOY_PATH is the directory where you want your 
# augmentedmaps deployed
DEPLOY_PATH = /home/rahul/augmentedmaps

# BACKUP_PATH is the directory where backup of any existing
# deployment of augmented maps will be kept (assuming its deployed at DEPLOY_PATH),
# before deploying the new application.
BACKUP_PATH = /tmp/backup2

# PostgreSQL database configuration
DB_USERNAME = postgres
DB_PASSWORD = postgres123
DATABASE_NAME = augmentedmaps

# PostGIS - Spatial Types for PostgreSQL
# /usr/share/postgresql/8.4/contrib/postgis-1.5/postgis.sql
POSTGIS_SQL = /usr/share/postgresql/8.4/contrib/postgis-1.5/postgis.sql

# Spatial Reference 
# /usr/share/postgresql/8.4/contrib/postgis-1.5/spatial_ref_sys.sql
SPATIAL_REF_SYS_SQL = /usr/share/postgresql/8.4/contrib/postgis-1.5/spatial_ref_sys.sql

# These parameters need not be changed, unless you know what you are doing.
DRUPAL = $(SOURCE_PATH)/lib/common/drupal-6.20
DRUPAL_MODULES = $(SOURCE_PATH)/lib/common/drupal_modules
DRUPAL_CUSTOM_MODULES = $(SOURCE_PATH)/src/drupal_custom/modules
DRUPAL_CUSTOM_THEMES = $(SOURCE_PATH)/src/drupal_custom/theme
CONFIG = $(SOURCE_PATH)/config
CUSTOM_AJAX = $(SOURCE_PATH)/src/server/ajax
CUSTOM_FLASH = $(SOURCE_PATH)/src/server/flash
CUSTOM_STANDALONE_PAGES = $(SOURCE_PATH)/src/server/standalone_pages
THIRD_PARTY_JS = $(SOURCE_PATH)/lib/common/javascript
TREEVIEW = $(SOURCE_PATH)/lib/common/treeview
OPENLAYERS = $(SOURCE_PATH)/lib/common/OpenLayers-2.10
AUGMENTEDMAPS_WITH_LAYERS_SQL =  $(SOURCE_PATH)/scripts/database/augmentedmaps_with_layers.sql
SETUP_DB_SQL = $(SOURCE_PATH)/scripts/database/setup_db.sql

# MAP_DATA is the directory where the .map files will reside
MAP_DATA = $(DEPLOY_PATH)/data

# CURRENT_BACKUP_DIR is the name of the directory where backup of the current
# deployment will be kept
CURRENT_BACKUP_DIR = augmentedmaps.backup.$(shell date +"%d-%m-%y")

# To backup the existing deployment; this should be done before 
# any new deployment, unless you have nothing to lose.
backup:
	@echo "Creating backup of "$(DEPLOY_PATH)
	mkdir -p $(BACKUP_PATH)
	cp -r $(DEPLOY_PATH) $(BACKUP_PATH)/$(CURRENT_BACKUP_DIR)
	@echo "Existing deployment backed up in " $(BACKUP_PATH)/$(CURRENT_BACKUP_DIR)

# To setup and populate database for augmented maps
# This should not be done if you already have augmented maps database setup
setupdb:
	@echo "Setting up Augmented Maps database ..."
	psql -U postgres -f $(SETUP_DB_SQL) -v POSTGIS_SQL=$(POSTGIS_SQL) -v SPATIAL_REF_SYS_SQL=$(SPATIAL_REF_SYS_SQL) -v AUGMENTEDMAPS_WITH_LAYERS_SQL=$(AUGMENTEDMAPS_WITH_LAYERS_SQL)
	@echo "Setting up Augmented Maps database complete."

# To deploy new augmented maps in DEPLOY_PATH
# This will copy files from src to the appropriate places
# in the new deployment
deploy:
	@echo "Deploying Augmented Maps ..."
	rm -rf $(DEPLOY_PATH)
	cp -r $(DRUPAL) $(DEPLOY_PATH)
	mkdir -p $(DEPLOY_PATH)/sites/all/modules
	cp -r $(DRUPAL_MODULES)/* $(DEPLOY_PATH)/sites/all/modules
	cp -r $(DRUPAL_CUSTOM_MODULES)/* $(DEPLOY_PATH)/sites/all/modules
	mkdir -p $(DEPLOY_PATH)/sites/all/themes
	cp -r $(DRUPAL_CUSTOM_THEMES)/* $(DEPLOY_PATH)/sites/all/themes
	cp -r $(CONFIG)/* $(DEPLOY_PATH)
	cp -r $(CUSTOM_AJAX)/* $(DEPLOY_PATH)
	cp -r $(CUSTOM_FLASH)/* $(DEPLOY_PATH)
	cp -r $(CUSTOM_STANDALONE_PAGES)/* $(DEPLOY_PATH)
	cp -r $(THIRD_PARTY_JS)/* $(DEPLOY_PATH)
	cp -r $(TREEVIEW) $(DEPLOY_PATH)/treeview

	sed s/_DB_USERNAME_/$(DB_USERNAME)/ < $(DRUPAL)/sites/default/default.settings.php|sed s/_DB_PASSWORD_/$(DB_PASSWORD)/| sed s/_DATABASE_NAME_/$(DATABASE_NAME)/ > $(DEPLOY_PATH)/sites/default/settings.php

	mkdir -p $(DEPLOY_PATH)/openlayers
	cp -r $(OPENLAYERS)/* $(DEPLOY_PATH)/openlayers

	mkdir -p $(DEPLOY_PATH)/shapefiles
	mkdir -p $(DEPLOY_PATH)/upload
	mkdir -p $(DEPLOY_PATH)/sites/default/files

	@echo "These directories needs to be owned by Apache:" 
	@echo $(DEPLOY_PATH)/shapefiles
	@echo $(DEPLOY_PATH)/upload
	@echo $(DEPLOY_PATH)/sites/default/files
	sudo chown -R www-data:www-data $(DEPLOY_PATH)/shapefiles $(DEPLOY_PATH)/upload $(DEPLOY_PATH)/sites/default/files
	
	@echo "Augmented Maps deployment complete."

# To generate map files and copy it to appropriate location in
# the deployment
generate_maps:	
	@echo "Generating map files"
	php $(SOURCE_PATH)/scripts/generateMapfiles/generateMapfiles.php -u $(DB_USERNAME) -d $(DATABASE_NAME) -p $(DB_PASSWORD) -h $(SOURCE_PATH)/scripts/generateMapfiles/header -f $(SOURCE_PATH)/scripts/generateMapfiles/footer -s $(SOURCE_PATH)/scripts/generateMapfiles/selectlayer -w $(SOURCE_PATH)/scripts/generateMapfiles/wfs
	@echo "Map files generation complete."

	@echo "Moving map file to "$(MAP_DATA)
	mkdir -p $(MAP_DATA)
	mv *.map $(MAP_DATA) 

	sed "s|@MAP_DATA|$(MAP_DATA)|" <  $(DEPLOY_PATH)/sites/all/modules/map/map.js > $(DEPLOY_PATH)/sites/all/modules/map/tmp_map.js
	mv $(DEPLOY_PATH)/sites/all/modules/map/tmp_map.js $(DEPLOY_PATH)/sites/all/modules/map/map.js

	cp $(SOURCE_PATH)/scripts/generateMapfiles/examples.sym $(MAP_DATA)

# To check dependencies required for augmented maps
# TODO: Check for dependencies; prompt and install
deps:
	@echo "Apache 2"
	@echo "PHP 5"
	@echo "PostgreSQL 8.4"
	@echo "GDAL"
	@echo "Postfix"
	@echo "MapServer 5.6.5"
	@echo "OpenLayers 2.10"
