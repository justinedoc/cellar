"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { label: "Join", value: 101253, suffix: "+", descriptor: "Users" },
  { label: "With Access To", value: 1067, suffix: "+", descriptor: "Memos" },
  { label: "Reading", value: 2672, suffix: "+", descriptor: "Books" },
];

export default function StatsBanner() {
  return (
    <section className="bg-foreground bottom-0 left-0 mx-auto w-full overflow-hidden rounded-t-xl px-4 py-4 shadow-xl md:absolute md:px-8">
      <div className="relative flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
        {stats.map(({ label, value, suffix, descriptor }) => (
          <motion.div
            key={descriptor}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <p className="font-base mb-1 text-sm text-gray-500 uppercase">
              {label}
            </p>

            <div className="flex items-baseline">
              <h3 className="text-primary mb-1 text-3xl font-bold md:text-4xl">
                <CountUp
                  end={value}
                  duration={2.5}
                  separator=","
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
                {suffix}
              </h3>
              <p className="text-lg font-medium text-gray-700">{descriptor}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
