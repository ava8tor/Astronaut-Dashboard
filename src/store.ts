import { ref, computed } from 'vue'

import { defineStore } from 'pinia'
import axios from 'axios';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
// export const useAlertsStore = defineStore('alerts', {
//   // other options...
// })

export const useCountStore = defineStore('counter', () => {
    const n = ref(0)
    const increment = (amount = 1) => {
        n.value += amount
    }
    const double = computed(() => n.value * 2)

    return { n, double, increment }
})

export const useAstronautStore = defineStore('astrounauts', () => {
    let astroData = ref([]);
    const n = ref(0);

    const fetchAstroData = async () => {
        try {
            //  await axios.get('https://jsonplaceholder.typicode.com/users')
            //     .then(( response: {data: any}) => { 
            //         astroData = response.data;
            //         // console.log(data.value);
            //     });
            // const data = await axios.get('https://jsonplaceholder.typicode.com/users');
            let data: any = [], repo = null, page = 0;
            let url = 'https://lldev.thespacedevs.com/2.3.0/astronauts/?limit=100';
            // do{
                repo = await axios.get(url);

                // console.log(repo.data);
                data = data.concat(repo.data.results);
                url = repo.data.next;
            // } while(url != null)
            
            astroData.value = data;
            // console.log(data);
            // console.log(astroData.value);
        }
        catch (error) {
            alert(error)
            console.log(error)
        }
    };

    return { n, astroData, fetchAstroData };
})