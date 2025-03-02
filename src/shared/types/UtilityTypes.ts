export type Prettify<O extends object> = { [Key in keyof O]: O[Key] }
