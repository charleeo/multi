<style>
.widget-user-header {
    background-image: url(~/images/laptop2.jpg);
	background-repeat: no-repeat;
	background-position: center;
    background-size: cover;
    heigth:450px;
}
.label-file{
    border: 0
}

</style>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 mt-3">
                <div class="card card-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="widget-user-header text-white" >
                <h3 class="widget-user-username text-left">Elizabeth Pierce</h3>
                <h5 class="widget-user-desc text-left">Web Designer</h5>
              </div>
              <div class="widget-user-image">
                <img class="img-circle" src= "/images/avater.png" alt="User Avatar">
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">3,200</h5>
                      <span class="description-text">SALES</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">13,000</h5>
                      <span class="description-text">FOLLOWERS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4">
                    <div class="description-block">
                      <h5 class="description-header">35</h5>
                      <span class="description-text">PRODUCTS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
            </div>
            </div>
                <div class="col-md-12 ">
                <div class="card  ">
                    <div class="card-header">
                        <span>Activity</span> 
                        <div class="card-tools">
                            <button class="btn btn-success"> Settings </button>   
                        </div>                 
                    </div>

                    <form  class="pl-3 pr-3 mt-3">
                    
                        <div class="form-group ">
                        <label> Name</label>
                            <input v-model="form.name" type="text" name="name" id="name"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }"
                                placeholder="Enter name"/>
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                        <label> Email </label>
                            <input v-model="form.email"  type="email" name="email" id="email"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }"
                                placeholder="Enter E-mail address"/>
                            <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                            <label> Experience</label>
                            <textarea v-model="form.bio"  type="text" name="bio" id="bio"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"
                                placeholder="What is your life experience">
                            <has-error :form="form" field="bio"></has-error>
                            </textarea>
                        </div>


                        <div class="form-group">
                            <label> Profile Photo </label>
                            <input  type="file" @change="updateProfile" name="photo" id="photo"
                                class="form-control label-file" :class="{ 'is-invalid': form.errors.has('photo') }"
                                >
                            <has-error :form="form" field="photo"></has-error>
                        </div>

                        <div class="form-group">
                            <label> Passport (leave empty if not changing)</label>
                            <input   type="text" name="password"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('password') }"
                                placeholder="passport"/>
                            <has-error :form="form" field="password"></has-error>
                        </div>

                        <div class='form-group'>
                            <button class="btn btn-primary">
                                    Update 
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

                 form: new Form({
                    id: '',
                    name: '',
                    email:'',
                    password: '',
                    bio:'',
                    // type:'',
                    photo: ''
                }),

            }
               
        },

        methods:{
            updateProfile(e){
               let file = e.target.files[0];
            //    console.log(file);
               let reader = new FileReader();
               reader.onloadend = (file)=>{
                   console.log("Result", reader.result);
                this.form.photo = reader.result;
               }
               reader.readAsDataURL(file);
            }
        },

        
        mounted() {
            console.log('Component mounted.')
        },

        created(){
            axios.get('api/profile')
            .then(({data})=>(this.form.fill(data)));
        }
    }
</script>
