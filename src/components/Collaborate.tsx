import { motion } from 'motion/react';

export default function Collaborate() {
  return (
    <section className="py-32 bg-surface relative overflow-hidden" id="collaborate">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--color-on-surface) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-surface-container/80 backdrop-blur-xl border border-outline-variant/20 p-12 md:p-20 relative overflow-hidden rounded-3xl shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase">Let's <span className="text-primary">Sync</span></h2>
            <p className="text-on-surface-variant mb-12 font-light text-lg">Available for collaborations, training opportunities, and technical discussions.</p>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-primary transition-colors">Identity</label>
                  <input 
                    className="w-full bg-transparent border-none border-b border-outline-variant/30 focus:ring-0 focus:border-primary text-on-surface py-4 transition-all outline-none placeholder:text-on-surface-variant/30" 
                    placeholder="Your Name" 
                    type="text"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-primary transition-colors">Email_Address</label>
                  <input 
                    className="w-full bg-transparent border-none border-b border-outline-variant/30 focus:ring-0 focus:border-primary text-on-surface py-4 transition-all outline-none placeholder:text-on-surface-variant/30" 
                    placeholder="email@nexus.com" 
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="block font-label text-[10px] uppercase tracking-widest text-primary transition-colors">Protocol_Objective</label>
                <textarea 
                  className="w-full bg-transparent border-none border-b border-outline-variant/30 focus:ring-0 focus:border-primary text-on-surface py-4 transition-all outline-none placeholder:text-on-surface-variant/30 resize-none" 
                  placeholder="Briefly describe the project or inquiry..." 
                  rows={4}
                ></textarea>
              </div>
              <button 
                className="w-full kinetic-glow text-on-primary font-headline font-bold uppercase py-5 tracking-widest text-sm rounded-xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-[0.98]" 
                type="submit"
              >
                Send Transmission
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
