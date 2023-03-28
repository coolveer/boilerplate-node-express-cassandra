module.exports={
    fields:{
        name    : "text",
        password : "text",
        email    : "text",
        wallet   : "text",
        mnemonics: "text",
        created: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        }
    },
    key:["email"]
}
