import axios from 'axios'


//创建axios请求实例
const instance = axios.create({
    baseURL : 'https://api.cat-shop.penkuoer.com',
    timeout: 5000
})

//封装post请求的方法
export const post = (url, data = {}) => {
    return new Promise((resolve,reject)=>{
        instance.post(url,data,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            resolve(res.data)
        },err=>{
            reject(err)
        })
    })
}