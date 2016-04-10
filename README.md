# Embedded Help

The Embedded Help module allows administrators to create help tags directly 
above fields in the back-end. This is useful for sites where admins would 
like to provide content writers and editors with on-page assistance 
regarding how best to use specific fields, or what an option means. These 
help tags can compliment and re-enforce existing consolidated documentation 
(e.g. Advanced Help pages).

Embedded Help tags can be be several different types (help, info, or warning) 
and display styles (clickable icon, expandable teaser, or full text).

Help tags can be created on the following pages:

* Any page whose URL begins with /admin
* User add/edit pages
* Node add/edit pages


## Installation

Place this folder and all subfolders into your modules directory (e.g. 
sites/all/modules/embedded_help)

Enable the Embedded Help module from Drupal's module list (admin/modules in 
Drupal 7).

Set the appropriate permissions. Embedded Help creates two permissions: One for 
viewing embedded help tags, and another for modifying them. Note that both 
must be checked for a user to be able to create/modify tags.

## How to use Embedded Fields

Once installed, users with permission to view & modify tags will see a small 
"Edit Help Tags" link in the top right of each form. Clicking on that link will 
reveal individual "Add Help Tag" or "Edit Help Tag" links above each field. 
Clicking on one of those links will bring up the "Modify Help Tag" dialog.

The title is optional, but recommended (it looks better, in the developer's 
humble opinion).

The message type (Help, Info, or Warning) determines the icon and background 
color of the message.

The display style determines whether the user must click on a help icon 
to view the message (Clickable Icon), click on a "...read more" link to expand 
the message if it's longer than several lines (Expandable Teaser), or is 
presented with the entire message regardless of length (Full Text). The "Full 
Text" option is recommended for important tags, such as warnings.
