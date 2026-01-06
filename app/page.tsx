"use client";

import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt, FaClock, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function FooterContact() {
  const phoneNumber = "+573135365766";
  const whatsappUrl = `https://wa.me/573135365766`;

  return (
    <footer id="contacto" className="bg-slate-950 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-start mb-20">
          
          {/* LADO IZQUIERDO: TEXTO Y CONTACTO */}
          <div>
            <div className="inline-block px-3 py-1 bg-[#FFC107] text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6">
              Contacto Directo
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-none">
              ¿LISTO PARA <br />
              <span className="text-cyan-500">POTENCIAR TU TECH?</span>
            </h2>
            
            <p className="text-slate-400 text-lg max-w-md mb-10 font-medium">
              Escríbeme o llámame. Estoy listo para diseñar la solución que tu hogar o empresa necesita en el Magdalena.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Celular */}
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <FaPhoneAlt size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Llámanos</p>
                  <p className="font-bold text-white tracking-tight">{phoneNumber}</p>
                </div>
              </a>

              {/* Horario */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-12 h-12 bg-[#FFC107]/10 rounded-xl flex items-center justify-center text-[#FFC107]">
                  <FaClock size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Atención</p>
                  <p className="font-bold text-white tracking-tight">Lun - Sáb / 8AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: TARJETA DE ACCIÓN (WA) */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full"></div>
            <div className="relative p-10 rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Presupuesto sin costo</h3>
              <p className="text-slate-400 mb-8 font-medium">
                Cuéntame tu proyecto por WhatsApp y recibe una asesoría técnica preliminar hoy mismo.
              </p>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-[#25D366] hover:bg-[#1ebd5b] text-white font-black uppercase tracking-widest text-sm transition-all shadow-[0_10px_30px_rgba(37,211,102,0.2)] active:scale-95"
              >
                <FaWhatsapp size={24} />
                Iniciar Chat Ahora
              </a>

              <div className="mt-8 pt-8 border-t border-slate-800 flex justify-center gap-6 text-slate-500">
                <a href="#" className="hover:text-cyan-500 transition-colors"><FaInstagram size={20} /></a>
                <a href="#" className="hover:text-cyan-500 transition-colors"><FaFacebook size={20} /></a>
                <a href="#" className="hover:text-cyan-500 transition-colors"><FaLinkedin size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM: LOGO Y LEGAL */}
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Image 
              src="/logo.png" 
              alt="Luis Oribe Logo" 
              width={50} 
              height={50} 
              className="brightness-0 invert opacity-80"
            />
            <div>
              <p className="text-lg font-black tracking-tighter leading-none">LUIS ORIBE</p>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Ingeniería & Tech</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              © {new Date().getFullYear()} Tecno Domi SM • Santa Marta, Colombia
            </p>
            <p className="text-[10px] text-slate-600 mt-1 uppercase font-medium">
              Seguridad Electrónica • Redes • Domótica • Energía Solar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}