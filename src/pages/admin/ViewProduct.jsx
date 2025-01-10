import React, { useEffect, useState } from 'react';
import { getAllProductsApi, deleteProduct } from '../../apis/Apis';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import UpdateProduct from './UpdateProduct';
import DeleteConfirmationDialog from '../../components/DeleteDialog';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getAllProductsApi()
      .then((res) => {
        if (res.data.success && res.data.products) {
          setProducts(res.data.products);
        } else {
          console.error('Error Fetching Products');
        }
      })
      .catch((error) => {
        console.error('Error Fetching Products:', error);
      });
  };

  const handleEdit = (productId) => {
    setEditProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(deleteProductId)
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
          fetchProducts();
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 500) {
            toast.warning(error.response.data.message);
          } else {
            toast.error('Something went wrong');
          }
        }
      })
      .finally(() => {
        setIsDeleteDialogOpen(false);
      });
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const ColorSwatch = ({ color }) => {
    const colorMap = {
      'red': 'bg-red-500',
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'yellow': 'bg-yellow-500',
      'purple': 'bg-purple-500',
      'pink': 'bg-pink-500',
      'black': 'bg-black',
      'white': 'bg-white border border-gray-200',
      'gray': 'bg-gray-500',
      'orange': 'bg-orange-500'
    };

    return (
      <div className="flex items-center gap-1">
        {color.map((c, index) => {
          const trimmedColor = c.trim().toLowerCase();
          return (
            <div 
              key={index}
              className={`w-6 h-6 rounded-full ${colorMap[trimmedColor] || 'bg-gray-200'}`}
              title={c.trim()}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products Overview</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sizes</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Colors</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {product.productImage.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000/products/${image}`}
                        alt={product.productName}
                        className="h-20 w-20 object-cover rounded-lg shadow-sm"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{product.productName}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.productCategory}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                    product.productQuantity > 10 
                      ? 'bg-green-100 text-green-800'
                      : product.productQuantity > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.productQuantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs truncate">
                    {product.productDescription}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    ${product.productPrice}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {product.productSize.map((size, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800"
                      >
                        {size.trim()}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <ColorSwatch color={product.productColor} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isEditModalOpen && (
        <UpdateProduct
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          productId={editProductId}
          onUpdate={fetchProducts}
        />
      )}
      
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ViewProduct;