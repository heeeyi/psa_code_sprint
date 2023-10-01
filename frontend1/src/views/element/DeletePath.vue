<template>
    <div>
        <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-menu-item index="5">
             <router-link to="/">
             <i class="el-icon-s-grid"></i>Show Stations</router-link>
      </el-menu-item>
      <el-menu-item index="6">
             <router-link to="/pt">
             <i class="el-icon-d-arrow-right"></i>Show Paths</router-link>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-circle-plus"></i>New</template>
          <el-menu-item index="1-1">
            <router-link to="/ns">New Station</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/np">New Path</router-link>
            </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-search"></i>Search</template>
          <el-menu-item index="2-1">
            <router-link to="/ss">Search Station</router-link>
            </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/sp">Search Path</router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <router-link to="/sr">Search Route</router-link>
            </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-delete"></i>Delete</template>
          <el-menu-item index="3-1">
            <router-link to="/ds">Delete Station</router-link>
            </el-menu-item>
          <el-menu-item index="3-2">
            <router-link to="/dp">Delete Path</router-link>
            </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-edit"></i>Update</template>
          <el-menu-item index="4-1">
            <router-link to="/us">Update Station</router-link>
          </el-menu-item>
          <el-menu-item index="4-2">
             <router-link to="/up">Update Path</router-link>
          </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: left; font-size: 40px">
      <span>Delete Path</span>
    </el-header>
    
    <el-main>
       <el-form :label-position="labelPosition" label-width="140px" :model="formLabelAlign">
      <el-form-item label="Source">
        <el-input v-model="formLabelAlign.source"></el-input>
      </el-form-item>
      <el-form-item label="Destination">
        <el-input v-model="formLabelAlign.destination"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="onSubmit">Delete</el-button>
      </el-form-item>
    </el-form>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            tableData: [],
            stationCargo: {
                station:"",
                cargo:""
            },
            labelPosition: 'right',
            formLabelAlign: {
            name: '',
            cargo: '',
            source: '',
            destination:'',
            distance:''
        }
        }
    },
    methods: {
        onSubmit() {
      // Create a JSON object with the data
      const requestData = {
        src: this.formLabelAlign.source,
        dst: this.formLabelAlign.destination,
      };

      axios
        .delete('http://localhost:3333/paths/delete', { data: requestData })
        .then((response) => {
          if (response.status === 200) {
            const message = response.data;
            this.$alert(message, 'Message', {
              confirmButtonText: 'OK',
              callback: (action) => {
                this.$message({
                  type: 'info',
                  message: `Action: ${action}`,
                });
              },
            });
          } else {
            this.$alert('Failed to delete path.', 'Error', {
              confirmButtonText: 'OK',
              callback: (action) => {
                this.$message({
                  type: 'error',
                  message: `Action: ${action}`,
                });
              },
            });
          }
        })
        .catch((error) => {
          console.error('Axios Error:', error); // Log the error for debugging
          this.$alert(error.response.data, 'Error', {
            confirmButtonText: 'OK',
          });
        });
    },
    },
    mounted () {
    }
}
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    
    .el-aside {
        color: #333;
    }
</style>