import { saveBrand, findBrandByName, findAllBrands, findBrandById } from "../repository/BrandRepository.js";

class BrandError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const createBrand = async (name, urlLogo) => {

    const existingBrand = await findBrandByName(name);

    if (existingBrand) {
        throw new Error('Nome de marca já cadastrado');
    }
    const newBrand = await saveBrand(name, urlLogo);
    return newBrand;
}

export const getAllBrands = async () => {
    return await findAllBrands();
}

export const getBrandById = async (id) => {
    if (id == null || id == 0){
        throw new BrandError('ID da marca inválido', 400);
    } 
    const brand = await findBrandById(id);
    if (!brand) {
        throw new BrandError('Marca não encontrada', 404);
    }
    return brand;
}   