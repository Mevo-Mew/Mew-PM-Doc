const routes = []

import sidebar from '@/store/sidebar'
sidebar.state.itemList.forEach((group)=>{
    group.items.forEach((item)=>{
        routes.push({
            name:item.name,
            path:'/' + item.path,
            component:()=>import('@views/' + item.path)
        })
    })
})

export default routes