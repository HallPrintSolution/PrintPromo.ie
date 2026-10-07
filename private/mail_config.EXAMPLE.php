<?php
/* =========================================================
   mail_config.php  — PrintPromo.ie SMTP credentials
   ---------------------------------------------------------
   PUT THIS FILE OUTSIDE THE WEB ROOT.
   On the Irish Domains server, place it at:
       /home/.../private/mail_config.php
   i.e. ONE LEVEL ABOVE httpdocs, in a folder called "private".
   Never place it inside httpdocs.
   ---------------------------------------------------------
   Rename this file to  mail_config.php  after filling it in.
   Values below are confirmed from Plesk > Mail Client Setup.
   ========================================================= */

return [
    // Outgoing SMTP server (from Mail Client Setup)
    'host'       => 'mail.email.ie',

    // The mailbox you created
    'username'   => 'enquiries@printpromo.ie',

    // The STRONG password you generated for that mailbox
    'password'   => 'XXXX',              // <-- paste the mailbox password here

    // Port 465 uses SSL (implicit encryption)
    'port'       => 465,
    'encryption' => 'ssl',

    // Where quote requests are delivered
    'to'         => 'enquiries@printpromo.ie',
];
