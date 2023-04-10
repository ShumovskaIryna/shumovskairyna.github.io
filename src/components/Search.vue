    <template>
        <div class="headerCenter">
            <form v-on:submit={submitHandler}>
                <div class="searchbar">
                    <input
                    type="text"
                    name="city"
                    v-model="searchQuery"
                    @input="getSearchResults"
                    class="searchInput"
                    onChange={onInputChange}
                    placeholder="Search for a city"
                    />
                    <div className='suggestion_bar'>
                        <ul
                        class="suggestion_list"
                        v-if="mapboxSearchResults"
                        >
                            <li
                            v-for="searchResult in mapboxSearchResults"
                            :key="searchResult.id"
                            class="suggestion_city"
                            @click="previewCity(searchResult)"
                            >
                                {{ searchResult.place_name }}
                            </li>
                        </ul>
                    </div>
                    <button
                    class="search_btn"
                    type="submit"
                    >
                    Add
                    </button>
                </div>
            </form>
        </div>
    </template>

    <script setup>
      import { ref } from "vue";
      import axios from "axios";
      const mapboxAPIKey =
        "pk.eyJ1IjoiaXJ5bmthcGFuZGEiLCJhIjoiY2xnYjkxcm9wMGw0bjNjcWxhcW5qZWJhNSJ9.T2d9setCNRmlOh3ix874Pw";
      const searchQuery = ref("");
      const queryTimeout = ref(null);
      const mapboxSearchResults = ref(null);
      const getSearchResults = () => {
        clearTimeout(queryTimeout.value);
        queryTimeout.value = setTimeout(async () => {
          if (searchQuery.value !== "") {
            const result = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
            );
            mapboxSearchResults.value = result.data.features;
            return;
          }
          mapboxSearchResults.value = null;
        }, 300);
      };
    </script>

    <style scoped>
        .headerCenter{
        height: fit-content;
        width: 100%;
        align-items: center;
        padding: 50px 40px 50px 40px;
        }
        .searchbar {
        width: 100%;
        height: 60px;
        background-color: white;
        border-radius: 30px;
        display: flex;
        align-items: center;
        }
        .searchInput {
        border: none;
        margin: 30px;
        width: 100%;
        font-size: larger;
        }
        .searchInput:focus {
        outline: none;
        }
        .search_btn {
        border-radius: 50%;
        height: 60px;
        width: 70px;
        cursor: pointer;
        }
        .suggestion_bar{
        position: absolute;
        top: 200px;
        left: 10%;
        width: 80%;
        }
        .suggestion_list{
        background-color: #d3d3d3;
        width: auto;
        text-align: start;
        padding: 10px 10px;
        }
        .suggestion_city{
        background-color: rgb(202, 202, 202);
        list-style: none;
        font-size: larger;
        cursor: pointer;
        margin: 10px 10px;
        padding: 10px 10px;
        }
    </style>