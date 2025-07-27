# Object–Context–Information Mapping – Template.io

This document outlines the **core concepts** of the _Template Management System (Template.io)_ project in terms of **Objects**, **Contexts**, and the **Information** relevant to each context. This breakdown follows standard Software Design principles and represents the domain model of the system.

---

## Object: User

### Context:
A User is an individual who interacts with Template.io. They can have different roles (System Admin, Company Admin, Employee, or Signer) with varying permissions. Users can log in, manage templates, generate documents, or sign documents based on their role.

### Information:
- Full Name
- Email Address
- Password (hashed)
- Role (System Admin, Company Admin, Employee, Signer)
- Associated Company ID (if applicable)
- Permissions (if Employee or Admin)
- Timestamps (Created At, Last Login)
- Profile Details (editable)

---

## Object: Company

### Context:
Company is the organization that subscribes to Template.io. Each company has its own set of users, templates, and subscription plan. A company can be registered by a visitor and activated by the System Admin.

### Information:
- Company Name
- Company ID (unique)
- Subscription Plan (Basic, Professional, Enterprise)
- Approval Status
- Creation Date
- Associated Users (Admins, Employees)
- Allowed Permissions (based on plan)

---

## Object: Subscription Plan

### Context:
Subscription Plans define what features and limits are available to a company. System Admin assigns these when approving a company registration.

### Information:
- Plan Name (Basic, Professional, Enterprise)
- Plan ID
- Allowed Permissions/Features
- Max Users/Templates (if applicable)
- Pricing (optional)

---

## Object: Email Template

### Context:
Email Templates are predefined formats used to send consistent communication with generated documents. They can be created and edited by Company Admins or Employees (if permitted).

### Information:
- Template Name
- Subject Line
- Email Body (HTML/Text)
- Creator (User ID)
- Editable/Deletable
- Associated Document Templates

---

## Object: Document Template

### Context:
Document Templates are `.docx` files with dynamic variables used to generate personalized documents. These templates can include signature fields and are tied to email templates.

### Information:
- Template Name
- Description
- Upload File (.docx format)
- Associated Email Template
- Is Signature Workflow (Boolean)
- Created By (User ID)
- Company ID
- Editable Fields (text, date, image, etc.)

---

## Object: Generated Document

### Context:
Generated Documents are the outcome of filling a Document Template with user-provided data. These documents can be previewed, sent via email, scheduled, or signed.

### Information:
- Document ID
- Source Template ID
- Input Data (form values or CSV data)
- Generation Timestamp
- Status (Generated, Sent, Scheduled)
- Associated Email Sent Log

---

## Object: Signature Workflow

### Context:
This process is initiated when a document has signature variables. The designated signer receives a secure link to view and sign the document digitally.

### Information:
- Signatory Email
- Document ID
- Signature Fields
- Signing URL (Secure, Token-Based)
- Signature Timestamp
- Signed PDF (output)

---

## Object: Inbox

### Context:
The Inbox shows all outgoing and scheduled emails. Users can view the status of each mail and take actions like resend, delete, or view email content.

### Information:
- Email Subject (from template)
- Recipient Email
- Sent Time / Scheduled Time
- Status (Sent / Scheduled / Failed)
- Related Document ID
- Actions (Resend, Delete, View)

---

## Object: Site Visitor

### Context:
Site Visitors can access the home page, browse subscription plans, and submit their company registration for approval. They cannot directly register as users.

### Information:
- Company Name
- Requested Plan
- Contact Email
- Request Date
- Approval Status
- Notification Email (on approval)

---

## Object: Dashboard

### Context:
After logging in, each user sees a role-based dashboard. It displays relevant stats, actions, and access to features such as templates, inbox, or company settings.

### Information:
- Recent Templates
- Document Activity Summary
- Email Statistics (sent/scheduled)
- Company Stats (for Admins)
- Shortcut Links (based on permissions)

---

## Object: Form Field (Variable)

### Context:
When a document template is uploaded, dynamic variables (e.g., `{{client_name}}`) are extracted and mapped to input types. These are shown in the data entry form.

### Information:
- Field Name (Variable Key)
- Field Type (Text, Date, Image, Paragraph)
- Is Signature Field (Boolean)
- Required/Optional
- Data Mapped from Upload/Form/CSV

---

## Object: CSV/Excel Upload

### Context:
Used in mass document generation workflows, users can upload structured files to auto-fill templates and generate multiple documents in one go.

### Information:
- Uploaded File (.csv or .xlsx)
- Mapped Fields (column → variable)
- Number of Entries
- Parsing Logs
- Processing Status (Success/Failure)

---

