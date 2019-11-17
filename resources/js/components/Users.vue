<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card">
                    <div class="card-header"> 
                        <h1 class="card-title"> Users Data </h1> 
    
                        <div class="card-tools">
                            <button class="btn btn-success" @click="displayModal">
                                Add New <i class = "fas fa-user-plus fa-fw"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body table-responsive p-0">
                       <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Eamil</th>
                                    <th>Type</th>
                                    <th>Modify</th>
                                    <th>Date Cretaed</th>
                                </tr>
                            </thead>
                             <tbody>
                                <tr v-for="user in users.data" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email}}</td>
                                    <td>{{ user.type | textCapitalsed }}</td>
                                    
                                    <td>
                                        <button @click="editModal(user)"  class="btn btn-link">
                                            <i class ="fas fa-edit green mr-3 "></i>
                                        </button>
                                        <button  @click="deleteUser(user.id)" class="btn btn-link">
                                            <i class ="fas fa-trash  red"></i>
                                        </button>
                                    </td>
                                    <td>{{ user.created_at | formatDate }}</td>
                                </tr>
                            </tbody>
                       </table>
                    </div>
                </div>
            </div>
        </div>
   

    <div class="modal fade" id="addNewModal" tabindex="-1" role="dialog" aria-labelledby="addNewModalLabel" aria-hidden="true">
    <div class="modal-dialog " role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="addNewModalLabel" v-if="!editmode">Add new User</h5>
            <h5 class="modal-title" id="addNewModalLabel" v-if="editmode">Update User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
         <form @submit.prevent="editmode ? updateUser() : createUser()">
            <div class="modal-body">
                <div class="form-group">
                    <input v-model="form.name" type="text" name="name" id="name"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }"
                        placeholder="Enter name"/>
                    <has-error :form="form" field="name"></has-error>
                </div>

                <div class="form-group">
                    <input v-model="form.email" v-if="editmode" readonly="readonly" type="email" name="email" id="email"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }"
                        placeholder="Enter E-mail address"/>
                    <has-error :form="form" field="email"></has-error>
                </div>

                <div class="form-group">
                    <input v-model="form.email" v-if="!editmode" type="email" name="email" id="email"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }"
                        placeholder="Enter E-mail address"/>
                    <has-error :form="form" field="email"></has-error>
                </div>

                <div class="form-group">
                    <textarea v-model="form.bio" type="text" name="bio" id="bio"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"
                        placeholder="give a short biography (optional)"></textarea>
                    <has-error :form="form" field="bio"></has-error>
                </div>

                <div class="form-group">
                    <select v-model="form.type" type="text" name="type" id="type"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }"
                        placeholder="Enter type">
                        <option value=''>Select user type</option>
                        <option value='admin'>Admin</option>
                        <option value='author'>Author</option>
                        <option value='user'>Standard Users</option>
                    </select>
                    <has-error :form="form" field="type"></has-error>
                </div>



                <div class="form-group" v-if="!editmode">
                    <input  v-model="form.password" type="password" name="password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }"
                        placeholder="Enter password"/>
                    <has-error :form="form" field="password"></has-error>
                </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button v-if ="!editmode" type="submit" class="btn btn-success" >Create User</button>
                    <button v-if="editmode"  type="submit" class="btn btn-success" >Update User</button>
                </div>
            </form>
        </div>
    </div>
    </div>
</div>
</template>

<script>
    export default {
        data () {
    return {
        // Edit the users' data
        editmode: false,
        // the use object
      users : {},
      // Create a new form instance
      form: new Form({
        id: '',
        name: '',
        email:'',
        password: '',
        bio:'',
        type:'',
        photo: ''
      })
    }
  },

  
  methods: {

    // Update Users function
      updateUser(){
          this.$Progress.start();
        //   console.log("edit");
            this.form.put('api/user/'+ this.form.id)
            .then(()=>{

                 toast.fire({
                icon: 'success',
                title: 'User updated successfully'
                });

                Fire.$emit('AfterCreate');
            // it ends here
                $('#addNewModal').modal('hide');

            })


             this.$Progress.finish()
             
            .catch(()=>{
                this.$Progress.fail();
            })
        },


      editModal(user){
          this.editmode = true
          this.form.reset()
        //    this.form.clear()
          $('#addNewModal').modal('show');
          this.form.fill(user);
      },

      displayModal(){
          this.editmode = false
          this.form.reset()
        //    this.form.clear()
          $('#addNewModal').modal('show');
      },
      
      deleteUser(id){

          swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {

                  if (result.value) {
                // sendan ajaxrequest to the server
                this.form.delete('api/user/'+id).then(()=>{
                   
                    swal.fire(
                    'Deleted!',
                    'User deleted.',
                    'success'
                    )
                    Fire.$emit('AfterCreate')
                }).catch(()=>{
                    swal.fire("Failed", "There was an error", "warning");
                })
            }
                
        })

      },


      loadUsers(){
         axios.get('api/user').then(({data})=>(this.users = data)); 
      },
      createUser(){
         this.$Progress.start();
         this.form.post('api/user') 
         .then(()=>{
             
        //  This a vue js custom event approach
        Fire.$emit('AfterCreate');
        // it ends here
        $('#addNewModal').modal('hide');

        // This is to give an alert
        toast.fire({
        icon: 'success',
        title: 'User created successfully'
        });

        // it ends here

         this.$Progress.finish()
            // .then(({ data }) => { console.log(data) });
         })
         .catch(()=>{})
      }
  },

        
        created() {
           this.loadUsers();

        //    call the custom event her
        Fire.$on('AfterCreate', () => {
            this.loadUsers();
        });
        //    setInterval(()=>this.loadUsers(), 3000);
        },

        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
