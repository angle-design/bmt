export default{
    Login(self){
        self.axios.get('/api/api/my/checklogin/').then(res=>{  
            if(res.data.code==205){
                self.$router.push('/login');
                return false;
            }
        })
    }
}