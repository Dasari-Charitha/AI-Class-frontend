import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string;
};

export default function StatCard({ title, value }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
    >
      <h3 className="text-gray-300 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-[#FFD700] mt-2">
        {value}
      </p>
    </motion.div>
  );
}