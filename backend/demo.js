const zod = require("zod")

const obj = zod.object({
    name: zod.string().email(),
})

console.log(obj.safeParse({name: "ankuk#gmail.xom"}))