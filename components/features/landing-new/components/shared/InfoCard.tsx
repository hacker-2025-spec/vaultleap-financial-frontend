import React from 'react'
import { motion } from 'framer-motion'

interface InfoCardItem {
  icon: string
  title: string
  description: string
  theme: string
}

interface InfoCardProps {
  features: InfoCardItem[]
}

const InfoCard: React.FC<InfoCardProps> = ({ features }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${features.length % 2 !== 0 && 'lg:grid-cols-3'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="glass-card border border-white/30 rounded-[30px]  hover:transform hover:-translate-y-2 transition-all duration-300 flex flex-col text-center md:text-left md:flex-row bg-white/70"
        >
          <div
            className="flex items-center justify-center w-[60px] h-[60px] rounded-full mb-5 shadow-icon transition-all duration-300 md:mr-8 relative flex-shrink-0 border border-blue-600/[0.08] m-auto md:m-px md:mb-5"
            style={{ background: 'rgba(0, 102, 255, 0.1)' }}
          >
            <span
              className={`font-normal not-italic text-[36px] leading-none tracking-normal normal-case inline-block whitespace-nowrap break-words ltr text-[#0066FF] ${
                feature.theme === 'black' && 'text-black'
              } font-icon`}
            >
              {feature.icon}
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</p>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default InfoCard
