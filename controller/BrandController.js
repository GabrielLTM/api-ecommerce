import { createBrand, getAllBrands, getBrandById, updateBrand, removeBrand } from "../services/BrandService.js";

export const postBrand = async (req, res) => {
  try {
    console.log("Chegou aqui: ", req.body)

    const { name, urlLogo } = req.body;

    if (!name || !urlLogo) {
      return res.status(400).json({ message: "Os campos 'name' e 'urlLogo' são obrigatórios." });
    }

    const newBrand = await createBrand(name, urlLogo);

    res.json(newBrand);
    }
     catch (err) {
    console.log("Erro ao cadastrar a marca: ", err)
    res.status(500).json({ message: 'Erro ao cadastrar a marca' });
  }
}

export const putBrand = async (req, res) => {
  const { id } = req.params;
  const { name, urlLogo } = req.body;

  try {
    const updatedBrand = await updateBrand(id, name, urlLogo);
    if (!updatedBrand) {
      return res.status(404).json({ message: 'Marca não encontrada' });
    }
    res.status(200).json(updatedBrand);
  } catch (err) {
    console.log("Erro ao atualizar a marca: ", err)
    res.status(500).json({ message: 'Erro ao atualizar a marca' });
  }
}

export const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await removeBrand(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Marca não encontrada' });
    }
    res.status(200).json({ message: 'Marca deletada com sucesso' });
  } catch (err) {
    console.log("Erro ao deletar a marca: ", err)
    res.status(500).json({ message: 'Erro ao deletar a marca' });
  }
}

export const getBrands = async (req, res) => {
  try {
    const brands = await getAllBrands();
    res.status(200).json(brands);
  } catch (err) {
    console.log("Erro ao buscar as marcas: ", err)
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const getBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await getBrandById(id);
    if (!brand) return res.status(404).json({ message: 'Marca não encontrada' });
    res.status(200).json(brand);
  } catch (err) {
    console.log("Erro ao buscar a marca: ", err)
    res.status(500).json({ message: 'ID Inválido' });
  }
};