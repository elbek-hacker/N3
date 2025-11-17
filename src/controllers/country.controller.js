import { getData, setData } from '../helpers/file.js'

class CountryController{
    async findAll(req, res){
        try {
            const countries = await getData();
            return res.status(200).json(countries);
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    async findOne(req, res){
        try {
            const id = +req.params?.id;
            const countries = await getData();
            const country = countries.find(el => el?.id === id );
            if(!country){
                return res.status(404).json({
                    message: 'Country not found'
                })
            }
            return res.status(200).json(country);
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export default new CountryController()

// const findAll =  async (_req, res )=>{
//     const countries = await getData();
//     return res.status(200).json(countries);
// };

// const findOne = async (req, res)=>{
//     const id = +req.params?.id;
//     const countries = await getData();
//     const country = countries.find(el => el?.id === id);
//     if(!country){
//         return res.status(404).json({
//             message: 'Country not found!'
//         });
//     }
//     return res.status(200).json(country);
// }

// const create = async (req, res)=>{
//     const countries = await getData();
//     const newCountry = {
//         id: countries?.length ? countries.at(-1)?.id + 1 : 1,
//         ...req.body
//     };
//     countries.push(newCountry);
//     await setData(countries);
//     return res.status(201).json(newCountry);
// }

// const update = async (req, res)=>{
//     const id = +req.params?.id;
//     const countries = await getData();
//     const index = countries.findIndex(el => el?.id === id);
//     if(index != -1){
//         countries[index] = { id, ...req.body };
//         await setData(countries);
//         return res.status(200).json(countries[index]);
//     };
//     return res.status(404).json({
//         message: 'Countries not found!'
//     });
// }

// const remove = async (req, res)=>{
//     const id = +req.params.id;
//     const countries = await getData();
//     const index = countries.findIndex(el => el?.id === id );
//     if(index != -1){
//         countries.splice(index, 1);
//         await setData(countries);
//         return res.status(200).json({});
//     }
//     return res.status(404).json({
//         message: 'Country not found!'
//     });
// }
// export { 
//     findAll,
//     findOne,
//     create,
//     update,
//     remove 
// }