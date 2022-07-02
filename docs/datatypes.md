# Data types in database.

---
> Data is stored in a { Key: Value } pair system. 
> 
> Data is divided into 2 sections: `warnings` and `config`.
```
{
    warnings: Map<number, object> -> {
        guildID: number -> {
            userID: number -> [
                {
                    issuer: number
                    reason: string
                    date: UTCString
                }
                ...
            }
            ...
        }
        ...
    },
    config: Map<number, object> -> {
        guildID: number -> {
            prefix: string
            logChannelID: number
        },
        ...
    }
}   
```