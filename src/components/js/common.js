export default{
    async Login(self){
        var islog = false;
       await self.axios.get('/api/api/my/checklogin/').then(res=>{  
            if(res.data.code==205){
                self.$router.push('/login');
            }else{
                islog = true;
            }
            
        })
        return islog;
    }
}