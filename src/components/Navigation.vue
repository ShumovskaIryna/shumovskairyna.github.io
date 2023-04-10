    <template>
        <div class="headerContainer">
            <RouterLink :to="{ name: 'home' }" class="logo">
                <div class="headerLeft">
                    <img src="../assets/panda.png" class="logoImg"/>
                    <NavLink to="/" class="logoText">Weather</NavLink>
                </div>
            </RouterLink>
        </div>
    </template>
  
    <script setup>
    import { RouterLink } from "vue-router";
    </script>
  
    <style scoped>
        .headerContainer {
        height: 80px;
        width: 100%;
        margin-bottom: 10px;
        background-color: #b5b5b5;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 999;
        }
        .headerLeft {
        flex: 2;
        }
        .logo {
        cursor: pointer;
        text-decoration-line: none;
        padding: 10px;
        }
        .logoText {
        font-size: 20px;
        margin-left: 20px;
        margin-right: 20px;
        font-weight: bold;
        color: rgb(0, 0, 0);
        }
        .logoImg{
        height: 50px;
        align-items: center;
        display: flex;        
        margin-left: 30px;
        margin-right: 30px;
        }
    </style>