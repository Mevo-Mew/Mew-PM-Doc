<script>
    export default {
        name: "formset-mixin-api",
        props:{
            'api:prefix':{
                type:String,
                default:''
            },
            'api:suffix':{
                type:String,
                default:''
            },
            'api:subject':{
                type:String,
                default:''
            },

            'api:getSubjectList':{
                type:String,
                default:''
            },
            'api:getSubjectRows':{
                type:String,
                default:''
            },
            'api:getMarkedSubjectList':{
                type:String,
                default:''
            },
            'api:getMarkedSubjectRows':{
                type:String,
                default:''
            },

            'api:getSubject':{
                type:String,
                default:''
            },
            'api:newSubject':{
                type:String,
                default:''
            },
            'api:updateSubject':{
                type:String,
                default:''
            },
            'api:deleteSubject':{
                type:String,
                default:''
            },



        },
        computed:{
            api(){
                let Subject = !this['api:subject'] ? '' : this['api:subject'][0].toUpperCase() + this['api:subject'].substring(1)

                let prefix = this['api:prefix']
                    prefix += prefix[prefix.length - 1] === '/' ? '' : '/'

                let suffix = this['api:suffix']
                if( suffix && (suffix[0] !== '?' && suffix[0] !== '/')) suffix = '/' + suffix

                let api = {
                    getSubjectList : this['api:getSubjectList'] ?  this['api:getSubjectList'] : 'get' + Subject + 'List', // get
                    getSubjectRows : this['api:getSubjectRows'] ?  this['api:getSubjectRows'] : 'get' + Subject + 'Rows', // get
                    getMarkedSubjectList : this['api:getMarkedSubjectList'] ?  this['api:getMarkedSubjectList'] : 'getMarked' + Subject + 'List', // get
                    getMarkedSubjectRows : this['api:getMarkedSubjectRows'] ?  this['api:getMarkedSubjectRows'] : 'getMarked' + Subject + 'Rows', // get

                    getSubject : this['api:getSubject'] ?  this['api:getSubject'] : 'get' + Subject, // get
                    newSubject : this['api:newSubject'] ?  this['api:newSubject'] : 'new' + Subject, // post
                    deleteSubject : this['api:deleteSubject'] ?  this['api:deleteSubject'] : 'delete' + Subject, // post
                    updateSubject : this['api:updateSubject'] ?  this['api:updateSubject'] : 'update' + Subject, // post
                }

                for(let key in api)
                    api[key] = prefix + api[key] + suffix

                api.subject = Subject
                api.prefix = prefix
                api.suffix = suffix

                return api
            }
        },
    }
</script>
