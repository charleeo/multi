<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card">
                    <div class="card-header"> 
                        <h1 class="card-title"> Users Table </h1> 
    
                        <div class="card-tools">
                            <button class="btn btn-success" data-toggle="modal" data-target="#addNewModal">
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
                                        <a href="#" >
                                            <i class ="fas fa-edit green mr-3 "></i>
                                        </a>
                                        <a href="#">
                                            <i class ="fas fa-trash  red"></i>
                                        </a>
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
            <h5 class="modal-title" id="addNewModalLabel">Add new User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
         <form v-on:submit.prevent="createUser">
            <div class="modal-body">
                <div class="form-group">
                    <input v-model="form.name" type="text" name="name" id="name"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }"
                        placeholder="Enter name"/>
                    <has-error :form="form" field="name"></has-error>
                </div>

                <div class="form-group">
                    <input v-model="form.email" type="email" name="email" id="email"
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



                <div class="form-group">
                    <input v-model="form.password" type="password" name="password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }"
                        placeholder="Enter password"/>
                    <has-error :form="form" field="password"></has-error>
                </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-success">Create User</button>
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
        // the use object
      users : {},
      // Create a new form instance
      form: new Form({
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
      loadUsers(){
         axios.get('api/user').then(({data})=>(this.users = data)); 
      },
      createUser(){
          this.$Progress.start();
         this.form.post('api/user') ;
        $('#addNewModal').modal('hide');
        toast.fire({
        type: 'success',
        title: 'User created successfully'
        });

         this.$Progress.finish()
            // .then(({ data }) => { console.log(data) });
      }
  },
        created() {
           this.loadUsers();
        },

        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
