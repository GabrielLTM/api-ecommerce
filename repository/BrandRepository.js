import { brands } from '../../database/index.js';

let idCounter = 1;

export const saveBrand = async (name, urlLogo) => {
    const newBrand = { id: idCounter++.toString(), name, urlLogo };
    brands.push(newBrand);
    return newBrand;
}

export const findBrandById = async (id) => {
    return brands.find(brand => brand.id === id);
}

export const findAllBrands = async () => {
    return brands;
}

export const findBrandByName = async (name) => {
    return brands.find(brand => brand.name === name);
}
 