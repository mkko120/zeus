# Warnings in database


> Warnings are stored in the database as `warnings` key.
> 
> The `warnings` key-value pair is an object consisting of:
```json5
{
  "490593263988768768": [ // user id
    {
      "issuer": "mkko120", // warn issuer (moderator or admin) username
      "reason": "No reason given.", // reason of warn
      "date": "Sat, 02 Jul 2022 13:39:57 GMT" // date in UTC string format
    },
  ],
}
```
