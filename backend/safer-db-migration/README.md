# Migration into safer db

To transform the database, we propose _soft migration_ instructions. This only
add some tables and some fields, without removing the old ones.

The new tables and fields have policies enabling to only allow the relevant user
accessing to the relevant data, all this on server-side.

The idea is to apply this soft migration with the production table updated.
Finally the old, annoying fields could be removed with the _hard migration_.  

## Requirements

## Soft migration instructions

1. Reboot your Pocketbase instance with the _new, __soft__ migrations_.  

2. Put the admin credentials of your Pocketbase instance in a `.env`

   ```env
   PB_URL=https://pocketbase-instance.org
   PB_ADMIN_EMAIL=admin@email.org
   PB_ADMIN_PASSWORD=secret-admin-password
   ```
3. Run the database transformation script.

   ```sh
   npm install && \
   node --env-file=.env src/index.js
   ```

## Hard migration instructions

TODO
