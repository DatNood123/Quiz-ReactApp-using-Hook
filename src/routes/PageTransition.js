import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ backgroundColor: "black", opacity: 0.5 }} // Trang mới bắt đầu với màu đen
            animate={{ backgroundColor: "transparent", opacity: 1 }} // Dần chuyển về màu nền gốc
            exit={{ backgroundColor: "black", opacity: 1 }} // Khi rời trang, chuyển thành màu đen
            transition={{ duration: 0.5, ease: "linear" }} // Hiệu ứng mượt trong 0.5 giây
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
