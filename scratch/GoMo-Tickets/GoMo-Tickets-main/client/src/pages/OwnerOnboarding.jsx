import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, Armchair, ChevronRight, LayoutGrid, MapPin } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { API } from '../config/api';

export default function OwnerOnboarding() {
  const { showToast } = useToast();
  const user = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));
  const hasBusinessInfo = !!(user?.business_info && user.business_info.businessName);
  
  const [step, setStep] = useState(hasBusinessInfo ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Business Info
  const [businessInfo, setBusinessInfo] = useState({
    businessName: user?.business_info?.businessName || '',
    gstNumber: user?.business_info?.gstNumber || '',
    address: user?.business_info?.address || '',
    logo: user?.business_info?.logo || null
  });
  const [logoFile, setLogoFile] = useState(null);

  // Step 2: Theatre Design
  const [theatreDesign, setTheatreDesign] = useState({
    rows: user?.theatre_design?.rows || 10,
    seatsPerRow: user?.theatre_design?.seatsPerRow || 12,
    standardRows: user?.theatre_design?.standardRows !== undefined ? user?.theatre_design?.standardRows : 3,
    premiumRows: user?.theatre_design?.premiumRows !== undefined ? user?.theatre_design?.premiumRows : 4,
    vipRows: user?.theatre_design?.vipRows !== undefined ? user?.theatre_design?.vipRows : 3
  });

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleNext = () => {
    if (step === 1) {
      if (!businessInfo.businessName || !businessInfo.gstNumber || !businessInfo.address) {
        showToast("Please fill all business details", "warning");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    // Validate rows
    if (theatreDesign.standardRows + theatreDesign.premiumRows + theatreDesign.vipRows !== theatreDesign.rows) {
      showToast("Standard + Premium + VIP rows must equal Total Rows!", "error");
      return;
    }

    setLoading(true);
    try {
      const formDataPayload = new FormData();
      formDataPayload.append('ownerId', user.id);
      formDataPayload.append('businessInfo', JSON.stringify({
        businessName: businessInfo.businessName,
        gstNumber: businessInfo.gstNumber,
        address: businessInfo.address,
        logo: businessInfo.logo // Send existing logo if no new file
      }));
      formDataPayload.append('theatreDesign', JSON.stringify(theatreDesign));
      if (logoFile) {
        formDataPayload.append('logo', logoFile);
      }

      const res = await fetch(`${API}/api/owner/onboarding`, { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` },
        body: formDataPayload
      });

      if (res.ok) {
        const data = await res.json();
        // Update user in localStorage
        const updatedUser = { ...user, business_info: data.businessInfo, theatre_design: theatreDesign };
        if (localStorage.getItem('tb_user')) localStorage.setItem('tb_user', JSON.stringify(updatedUser));
        if (localStorage.getItem('sso_user')) localStorage.setItem('sso_user', JSON.stringify(updatedUser));
        
        showToast("Onboarding setup saved successfully!", "success");
        navigate('/owner');
      } else {
        showToast("Failed to save configuration", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving configuration", "error");
    }
    setLoading(false);
  };

  const renderSeatPreview = () => {
    const rows = Array.from({length: theatreDesign.rows}, (_, i) => String.fromCharCode(65 + i));
    const seats = Array.from({length: theatreDesign.seatsPerRow}, (_, i) => i + 1);

    return (
      <div className="bg-zinc-900 rounded-3xl p-6 sm:p-10 border-4 border-zinc-800 shadow-2xl relative w-full overflow-hidden">
        <div className="w-3/4 max-w-[600px] mx-auto h-2 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mb-10 shadow-[0_10px_30px_rgba(249,115,22,0.5)]"></div>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-8 text-center">Screen</p>
        
        <div className="flex flex-col gap-1.5 sm:gap-3 w-full max-w-5xl mx-auto">
          {rows.map((row, rowIndex) => {
            let tierColor = 'text-zinc-400 border-zinc-700 bg-zinc-800/50';
            if (rowIndex < theatreDesign.standardRows) {
              tierColor = 'text-zinc-400 border-zinc-700 bg-zinc-800/50';
            } else if (rowIndex < theatreDesign.standardRows + theatreDesign.premiumRows) {
              tierColor = 'text-blue-400 border-blue-500/50 bg-blue-500/10';
            } else {
              tierColor = 'text-purple-400 border-purple-500/50 bg-purple-500/10';
            }

            const leftCount = Math.floor(seats.length * 0.3);
            const midCount = Math.floor(seats.length * 0.7) - leftCount;
            const rightCount = seats.length - Math.floor(seats.length * 0.7);

            return (
              <div key={row} className="flex gap-2 sm:gap-6 items-center w-full">
                <span className="text-zinc-600 font-black w-3 sm:w-6 text-right shrink-0 text-[10px] sm:text-sm">{row}</span>
                
                {/* Left Block */}
                <div className="flex gap-1 justify-end" style={{ flexGrow: leftCount, flexBasis: 0 }}>
                  {seats.slice(0, leftCount).map(num => (
                    <div key={`${row}${num}`} className={`flex-1 max-w-[2.5rem] aspect-square rounded-[3px] sm:rounded-t-lg sm:rounded-b-sm border flex items-center justify-center ${tierColor}`}>
                      <Armchair className="opacity-50 w-3 h-3 sm:w-4 sm:h-4 hidden md:block" />
                    </div>
                  ))}
                </div>
                
                {/* Middle Block */}
                <div className="flex gap-1 justify-center" style={{ flexGrow: midCount, flexBasis: 0 }}>
                  {seats.slice(leftCount, leftCount + midCount).map(num => (
                    <div key={`${row}${num}`} className={`flex-1 max-w-[2.5rem] aspect-square rounded-[3px] sm:rounded-t-lg sm:rounded-b-sm border flex items-center justify-center ${tierColor}`}>
                      <Armchair className="opacity-50 w-3 h-3 sm:w-4 sm:h-4 hidden md:block" />
                    </div>
                  ))}
                </div>
                
                {/* Right Block */}
                <div className="flex gap-1 justify-start" style={{ flexGrow: rightCount, flexBasis: 0 }}>
                  {seats.slice(leftCount + midCount, seats.length).map(num => (
                    <div key={`${row}${num}`} className={`flex-1 max-w-[2.5rem] aspect-square rounded-[3px] sm:rounded-t-lg sm:rounded-b-sm border flex items-center justify-center ${tierColor}`}>
                      <Armchair className="opacity-50 w-3 h-3 sm:w-4 sm:h-4 hidden md:block" />
                    </div>
                  ))}
                </div>

                <span className="text-zinc-600 font-black w-3 sm:w-6 ml-1 sm:ml-2 shrink-0 text-[10px] sm:text-sm">{row}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 mt-12 pt-6 border-t border-zinc-800 w-full text-sm font-bold flex-wrap">
          <div className="flex items-center gap-2 text-zinc-400"><div className="w-4 h-4 rounded bg-zinc-800 border border-zinc-700"></div> Standard</div>
          <div className="flex items-center gap-2 text-blue-400"><div className="w-4 h-4 rounded bg-blue-500/10 border border-blue-500/50"></div> Premium</div>
          <div className="flex items-center gap-2 text-purple-400"><div className="w-4 h-4 rounded bg-purple-500/10 border border-purple-500/50"></div> VIP</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12 font-sans selection:bg-orange-500 selection:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/20">
            <Building2 size={32} />
          </div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight mb-2">Welcome to Partner Dashboard</h1>
          <p className="text-zinc-500 font-medium">Let's get your theatre setup and verified to start selling tickets.</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-black ${step >= 1 ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30' : 'bg-zinc-200 text-zinc-400'}`}>1</div>
            <div className={`h-1 w-16 rounded-full ${step >= 2 ? 'bg-orange-600' : 'bg-zinc-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-black ${step >= 2 ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30' : 'bg-zinc-200 text-zinc-400'}`}>2</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left Panel */}
          <div className={`w-full md:w-[400px] bg-zinc-900 p-10 flex flex-col justify-between text-white transition-all duration-500 ${step === 2 && 'md:w-[350px]'}`}>
            <div>
              <h2 className="text-2xl font-black text-white mb-2">{step === 1 ? 'Business Verification' : 'Design Your Theatre'}</h2>
              <p className="text-zinc-400 font-medium leading-relaxed mb-8">
                {step === 1 
                  ? 'We need some legal details to verify your business and enable payouts.'
                  : 'Customize your seating layout. You can define the number of rows, seats, and pricing tiers.'}
              </p>
              
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={20}/>
                    <p className="text-sm text-zinc-300 font-medium">Secure verification process</p>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <CheckCircle2 className="text-orange-500 shrink-0 mt-0.5" size={20}/>
                    <p className="text-sm text-zinc-300 font-medium">Enable Razorpay payouts</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Total Rows (Max 20)</label>
                    <input 
                      type="range" min="5" max="20" 
                      value={theatreDesign.rows}
                      onChange={(e) => setTheatreDesign({...theatreDesign, rows: parseInt(e.target.value)})}
                      className="w-full accent-orange-500"
                    />
                    <div className="text-right text-orange-400 font-black text-xl">{theatreDesign.rows}</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Seats per Row (Max 25)</label>
                    <input 
                      type="range" min="5" max="25" 
                      value={theatreDesign.seatsPerRow}
                      onChange={(e) => setTheatreDesign({...theatreDesign, seatsPerRow: parseInt(e.target.value)})}
                      className="w-full accent-orange-500"
                    />
                    <div className="text-right text-orange-400 font-black text-xl">{theatreDesign.seatsPerRow}</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-zinc-500 font-medium text-sm border-t border-zinc-800 pt-6 mt-12">
              <span className="text-orange-500 font-bold">Need help?</span> Contact Partner Support
            </div>
          </div>

          {/* Right Panel - Dynamic Content */}
          <div className="flex-1 p-10 md:p-14 bg-white relative">
            
            {step === 1 ? (
              <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Registered Business Name</label>
                  <div className="relative">
                    <Building2 size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text" 
                      value={businessInfo.businessName}
                      onChange={(e) => setBusinessInfo({...businessInfo, businessName: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 font-bold focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="e.g. Inox Leisure Ltd"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">GST Identification Number</label>
                  <div className="relative">
                    <CheckCircle2 size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text" 
                      value={businessInfo.gstNumber}
                      onChange={(e) => setBusinessInfo({...businessInfo, gstNumber: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 font-bold focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="e.g. 22AAAAA0000A1Z5"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">HQ Address</label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-4 top-4 text-zinc-400" />
                    <textarea 
                      rows="3"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 font-bold focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                      placeholder="Complete business address..."
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Business Logo (Optional)</label>
                  <div className="relative">
                    <input 
                      type="file" accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setLogoFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setBusinessInfo({...businessInfo, logo: reader.result});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="logoUpload"
                    />
                    <label htmlFor="logoUpload" className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors cursor-pointer text-zinc-500 font-bold">
                      {businessInfo.logo ? (
                        <div className="flex items-center gap-4 w-full justify-between">
                          <img src={businessInfo.logo} alt="Logo preview" className="h-10 w-auto max-w-[100px] object-contain rounded" />
                          <span className="text-xs">Change Image</span>
                        </div>
                      ) : (
                        <span>Upload Company Logo</span>
                      )}
                    </label>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleNext}
                    className="w-full bg-zinc-900 hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-colors shadow-lg shadow-zinc-200 flex items-center justify-center gap-2"
                  >
                    Continue to Design <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col animate-fadeIn">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Standard Rows</label>
                    <input type="number" min="0" max={theatreDesign.rows} value={theatreDesign.standardRows} onChange={(e) => setTheatreDesign({...theatreDesign, standardRows: parseInt(e.target.value) || 0})} className="w-full bg-white border border-zinc-200 rounded-lg p-2 font-bold text-zinc-900" />
                  </div>
                  <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <label className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Premium Rows</label>
                    <input type="number" min="0" max={theatreDesign.rows} value={theatreDesign.premiumRows} onChange={(e) => setTheatreDesign({...theatreDesign, premiumRows: parseInt(e.target.value) || 0})} className="w-full bg-white border border-blue-200 rounded-lg p-2 font-bold text-blue-900" />
                  </div>
                  <div className="flex-1 bg-purple-50 border border-purple-100 rounded-xl p-4">
                    <label className="text-xs font-bold text-purple-500 uppercase tracking-widest block mb-2">VIP Rows</label>
                    <input type="number" min="0" max={theatreDesign.rows} value={theatreDesign.vipRows} onChange={(e) => setTheatreDesign({...theatreDesign, vipRows: parseInt(e.target.value) || 0})} className="w-full bg-white border border-purple-200 rounded-lg p-2 font-bold text-purple-900" />
                  </div>
                </div>

                <div className="flex-1 relative">
                  {renderSeatPreview()}
                </div>

                <div className="flex gap-4 mt-8">
                  {!hasBusinessInfo && (
                    <button 
                      onClick={() => setStep(1)}
                      className="px-8 py-4 rounded-xl border-2 border-zinc-200 font-black text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button 
                    onClick={handleSubmit} disabled={loading}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Saving Layout...' : 'Save & Enter Dashboard'} <LayoutGrid size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
