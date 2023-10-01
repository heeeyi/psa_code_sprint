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
      <span>PortEco Manager</span>
    </el-header>
    
    <el-main>
      <el-table :data="tableData" model="stationCargo" max-height="400">
        <el-table-column v-model="stationCargo.name" prop="name" label="station" width="500">
        </el-table-column>
        <el-table-column v-model="stationCargo.cargo_amount" prop="cargo_amount" label="cargo amount" width="500">
        </el-table-column>
      </el-table>
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
                name:"",
                cargo_amount:""
            }
        }
    },
    methods: {
        fetchData() {
      // Send a GET request to the backend to fetch station data
      axios
        .get(`http://localhost:3333/stations`)
        .then((response) => {
          // Set the response data directly to the tableData property
          this.tableData = response.data;
        })
        .catch((error) => {
          console.error('Axios Error:', error);
        });
    },
    },
    mounted () {
       this.fetchData();
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