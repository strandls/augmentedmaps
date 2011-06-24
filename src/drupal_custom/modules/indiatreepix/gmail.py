import email, getpass, imaplib, os 
from xml.dom.minidom import Document
from xml.dom.minidom import parse

import sys
import time
from time import strftime
timetouse = strftime("%d-%b-%Y", time.strptime(sys.argv[1], '%d-%b-%Y'))

from time import time, gmtime, strftime

# remove lines starting with ">"
def processText(text):
	lines = text.splitlines(True)
	processedlines = []
	for line in lines:
		if line.startswith(">"):
			continue
		else:
			processedlines.append(line)
	return " ".join(processedlines);



# Take gmail username and passwd

user = 'indiatreepix'; #raw_input("Enter your GMail username:") 
pwd = 'indiatreepix123'; #getpass.getpass("Enter your password: ") 

# connecting to the gmail imap server 
m = imaplib.IMAP4_SSL("imap.gmail.com") 
m.login(user,pwd)


#toDownload = raw_input("Select a gmail folder to download: ")
#m.select(toDownload) # here you a can choose a mail box like INBOX instead 
#detach_dir = toDownload 

m.select("indiatreepix") # here you a can choose a mail box like INBOX instead 
detach_dir = "detach_dir_processed_2" 

print  "Downloading in " + detach_dir

# Create Folder for download
dirname = os.path.join(".", detach_dir)
if not os.path.isdir(dirname):
	os.mkdir(dirname)

# Search for messages to download
#GET MESSAGES ONLY AFTER DATE
#resp,items = m.search(None, 'SINCE', timetouse) # you could filter using the IMAP rules here (check http://www.example-code.com/csharp/imap-search-critera.asp) 
resp,items = m.search(None, "All") # you could filter using the IMAP rules here (check http://www.example-code.com/csharp/imap-search-critera.asp) 
#resp,items = m.search("SINCE \"8-Aug-2006\"", "All") 
#fetchUids = 1;
#print m.search("SINCE \"8-Aug-2006\"",fetchUids);
#items = m.search("SINCE \"8-Aug-2006\"",fetchUids);

items = items[0].split() # getting the mails id 

# Iterate through all the messages meeting search criterion
#mailfileid = open("mailfile.txt","w")
for emailid in items:
	try :
		# fetching the mail, "`(RFC822)`" means "get the whole stuff", but you can ask for headers only, etc 
		resp,data = m.fetch(emailid, "(RFC822)") 

		# getting the mail content 
		email_body = data[0][1] 

		# parsing the mail content to get a mail object
		mail = email.message_from_string(email_body)

		#	print >>mailfileid, "\n###########\n" 
		#	print >> mailfileid, mail
		#	print >>mailfileid, "\n###########\n"
		#	mailfileid.flush()
	

		#Check if any attachments at all
		# If mail is not multipart skip it .. Why ??
		#if mail.get_content_maintype() != 'multipart': 
		#	continue 

		# create directory using the message id of thread starting message
		# For subsequent messages, use the first message in thread
		references = mail["References"]
		messageid = mail["Message-ID"]

		idfilename = messageid
		firstinthread = "true"
		print " Message " + emailid
		#print "ID " + messageid
		if references:
			#print "references " + references
			firstinthread = "false"
			references = references.split(">")
			idfilename = references[0]
			#print " reference 0 " + references[0]
	        idfilename = ''.join(e for e in idfilename if e.isalnum())
		#idfilename = idfilename.lstrip("<")
		#idfilename = idfilename.rstrip(">")
		#print " idfilename " + idfilename
		# Write fields in XML document
		idfilepath = os.path.join(dirname, idfilename) + ".xml"

		doc = None
		root = None
		if os.path.isfile(idfilepath):
			doc = parse(idfilepath)
			root = doc.getElementsByTagName('root')
			root = root[0]
			print "idfilename: " +  idfilename
		else:
			doc = Document()
			root = doc.createElement('root')
			doc.appendChild(root)
	
		message = doc.createElement('Message')
		root.appendChild(message)

		requestnode = doc.createElement('IDRequest')
		message.appendChild(requestnode)
		text = doc.createTextNode(firstinthread)
		requestnode.appendChild(text)

	
		messageidnode = doc.createElement('MessageID')
		message.appendChild(messageidnode)
		text = doc.createTextNode(mail["Message-ID"])
		messageidnode.appendChild(text)


		messageemailidnode = doc.createElement('EmailID')
		message.appendChild(messageemailidnode)
		text = doc.createTextNode(emailid)
		messageemailidnode.appendChild(text)
	
		messagefrom = doc.createElement('From')
		message.appendChild(messagefrom)
		text = doc.createTextNode(mail["From"])
		messagefrom.appendChild(text)


		messagesubject = doc.createElement('Subject')
		message.appendChild(messagesubject)
		text = doc.createTextNode(mail["Subject"])
		messagesubject.appendChild(text)


		referencesnode = doc.createElement('References')
		message.appendChild(referencesnode)
		
		if references:
			reference = doc.createElement('Reference')
			referencesnode.appendChild(reference)
			text = doc.createTextNode(mail["References"])
			reference.appendChild(text)

		messagedate = doc.createElement('Date')
		message.appendChild(messagedate)
		text = doc.createTextNode(mail["Date"])
		messagedate.appendChild(text)
		
		attachmentsnode = doc.createElement('Attachments')
		message.appendChild(attachmentsnode)


		#print >>f, " ### ID ### "  + mail["Message-ID"] + "\n"
		#print >>f, " ### From ### " + mail["From"] + "\n"
		#print >>f, " ### Subject ### " +  mail["Subject"] + "\n"
		
		#if references:
		#	print >>f, " ### References ### " + mail["References"] + "\n"

		# we use walk to create a generator so we can iterate on the parts and forget about the recursive headach 
		for part in mail.walk(): 
			# we are interested only in the simple text messages
			if part.get_content_subtype() == 'plain':
				payload = part.get_payload()
				#print >>f, "### Body is ### \n" + payload + "\n###\n"
				messagetext = doc.createElement('MessageText')
				message.appendChild(messagetext)
				if (firstinthread == "false"):
					payload = processText(payload)
				text = doc.createTextNode(payload)
				messagetext.appendChild(text)
			
			# multipart are just containers, so we skip them 
			if part.get_content_maintype() == 'multipart': 
				continue 

			# is this part an attachment ? 
			if part.get('Content-Disposition') is None: 
				continue

			filename = part.get_filename() 
			counter = 1 

			# if there is no filename, we create one with a counter to avoid duplicates 
			if not filename: 
				filename = 'part-%03d%s' % (counter, 'bin') 
				counter += 1 

			att_dir = os.path.join(dirname, emailid)
			if not os.path.isdir(att_dir):
				os.mkdir(att_dir)
		
			att_path = os.path.join(att_dir, filename) 

			#Check if its already there 
			if not os.path.isfile(att_path) : 
				# finally write the stuff 
				fp = open(att_path, 'wb') 
				fp.write(part.get_payload(decode=True)) 
				fp.close()
				#print >>f, "### Attachment ### " + att_path + "\n"
				attachment = doc.createElement('Attachment')
				attachmentsnode.appendChild(attachment)
				text = doc.createTextNode(att_path)
				attachment.appendChild(text)
				
				fileid = os.path.join(att_dir, "info.txt")
				f = open(fileid,"a")
				print >>f, " Filename: " + idfilename + "\n"
				print >>f, " Messageid: " + messageid + "\n"
				print >>f, " Attachment Path: " + att_path + "\n"
				f.close()
		
		#dirname = os.path.join(basedirname,idfilename)

		#if not os.path.isdir(dirname):
		#	os.mkdir(dirname)
		
		# Write XML to a file
		#fileid = os.path.join(dirname, idfilename) + ".xml"
		f = open(idfilepath,"w")
		print >>f, doc.toxml()
		f.close()
		#mailfileid.close()
	except :
	    	pass
	
