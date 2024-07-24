import React from "react";
import { motion } from "framer-motion";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Confirm Your Action</h2>
        <p className="mb-6">Are you sure, you want to proceed with this action?</p>
        <div className="flex justify-end space-x-4">
          <motion.button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
            whileHover={{ scale: 1.1 }}
          >
            No
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            whileHover={{ scale: 1.1 }}
          >
            Yes
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
