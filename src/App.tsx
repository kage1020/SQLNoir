import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Github, Coffee, Share2 } from "lucide-react";
import { BsIncognito } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { Dashboard } from "./components/Dashboard";
import { CaseSolver } from "./components/CaseSolver";
import { UserMenu } from "./components/auth/UserMenu";
import { SharePopup } from "./components/SharePopup";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { supabase } from "./lib/supabase";

export default function App() {
  const { t } = useTranslation('common');
  const [started, setStarted] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_info")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    // Get initial session
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        // Auto-start if user is logged in
        setStarted(true);
        fetchUserInfo(currentUser.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Auto-start if user logs in
        setStarted(true);
        fetchUserInfo(currentUser.id);
      } else {
        setUserInfo(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCaseSolved = async () => {
    if (user) {
      await fetchUserInfo(user.id);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    const sqlTips = t('sqlTips', { returnObjects: true }) as string[];
    const randomTip = sqlTips[Math.floor(Math.random() * sqlTips.length)];

    return (
      <div className="min-h-screen bg-amber-50/50 flex flex-col items-center justify-center space-y-8">
        <h2 className="text-3xl font-detective text-amber-900">{t('loading.loading')}</h2>
        <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
        <div className="max-w-md text-center">
          <p className="text-lg font-detective text-amber-800">
            {t('loading.detectiveTip')}
          </p>
          <p className="text-amber-700 italic mt-2">{randomTip}</p>
        </div>
      </div>
    );
  }

  if (selectedCase) {
    return (
      <>
        <SharePopup
          isOpen={isSharePopupOpen}
          onClose={() => setIsSharePopupOpen(false)}
        />
        <CaseSolver
          caseData={selectedCase}
          onBack={() => setSelectedCase(null)}
          onSolve={handleCaseSolved}
        />
      </>
    );
  }

  if (started) {
    return (
      <>
        <SharePopup
          isOpen={isSharePopupOpen}
          onClose={() => setIsSharePopupOpen(false)}
        />
        <Dashboard onCaseSelect={setSelectedCase} userInfo={userInfo} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/50 flex flex-col items-center justify-center p-4 md:p-8">
      <SharePopup
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
      />
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <LanguageSwitcher />
        <UserMenu user={user} onSignOut={() => setUser(null)} />
        <button
          onClick={() => setIsSharePopupOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100/80 hover:bg-amber-200/80
                   text-amber-900 transition-colors duration-200 backdrop-blur-sm"
          title="Share SQL Noir"
        >
          <Share2 className="w-5 h-5" />
          <span className="hidden sm:inline">{t('buttons.share')}</span>
        </button>
        <a
          href="https://github.com/hristo2612/SQLNoir"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100/80 hover:bg-amber-200/80
                   text-amber-900 transition-colors duration-200 backdrop-blur-sm"
        >
          <Github className="w-5 h-5" />
          <span className="hidden sm:inline">{t('buttons.starOnGitHub')}</span>
        </a>
        <a
          href="https://buymeacoffee.com/hristobogoev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100/80 hover:bg-amber-200/80
                   text-amber-900 transition-colors duration-200 backdrop-blur-sm"
        >
          <Coffee className="w-5 h-5" />
          <span className="hidden sm:inline">{t('buttons.buyMeACoffee')}</span>
        </a>
        <a
          href="https://discord.gg/TuTCZHEs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100/80 hover:bg-amber-200/80
                   text-amber-900 transition-colors duration-200 backdrop-blur-sm"
        >
          <FaDiscord className="w-5 h-5" />
          <span className="hidden sm:inline">{t('buttons.joinDiscord')}</span>
        </a>
      </div>

      <div className="w-full max-w-xl mx-auto text-center space-y-12">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-40 h-40 relative mb-4 flex items-center justify-center">
              <BsIncognito className="w-full h-full text-amber-900 relative" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h1 className="font-detective text-5xl md:text-8xl text-amber-900 drop-shadow-lg">
            {t('appName')}
          </h1>

          <p className="text-xl md:text-2xl text-amber-800 font-detective">
            {t('tagline')}
          </p>

          <button
            onClick={() => setStarted(true)}
            className="group bg-amber-800/90 hover:bg-amber-700/90 text-amber-100 px-10 py-5 rounded-lg
                     text-2xl font-detective transition-all duration-300 transform hover:scale-105
                     flex items-center justify-center mx-auto shadow-lg hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            {t('buttons.startInvestigation')}
            <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
