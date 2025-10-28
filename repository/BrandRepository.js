import { brands } from '../database/index.js';

let idCounter = 1;

export const saveBrand = async (name, urlLogo) => {
    const newBrand = { id: (idCounter++).toString(), name, urlLogo };
    brands.push(newBrand);
    return newBrand;
}

export const findBrandById = async (id) => {
    console.log("Finding brand by ID: ", id);
    return brands.find(brand => brand.id === id);
}

export const findAllBrands = async () => {
    return brands;
}

export const findBrandByName = async (name) => {
    return brands.find(brand => brand.name === name);
}
 
export const updateBrandById = async (id, brand) => {
    const index = brands.findIndex(b => b.id === id);
    if (index !== -1) {
        brands[index] = { ...brands[index], ...brand };
        return brands[index];
    }
    return null;
}

export const deleteBrandById = async (id) => {
    const index = brands.findIndex(b => b.id === id);
    if (index !== -1) {
        const deletedBrand = brands.splice(index, 1);
        return deletedBrand[0];
    }
    return null;
}   