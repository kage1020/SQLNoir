import { useState, useEffect } from "react";
import { ChevronRight, Github } from "lucide-react";
import { BsIncognito } from "react-icons/bs";
import { Dashboard } from "./components/Dashboard";
import { CaseSolver } from "./components/CaseSolver";
import { UserMenu } from "./components/auth/UserMenu";
import { supabase } from "./lib/supabase";

export default function App() {
  const [started, setStarted] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchUserInfo(currentUser.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
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

  if (selectedCase) {
    return (
      <>
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
        <Dashboard onCaseSelect={setSelectedCase} userInfo={userInfo} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <UserMenu user={user} onSignOut={() => setUser(null)} />
        <a
          href="https://github.com/stackblitz/sql-detective"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100/80 hover:bg-amber-200/80 
                   text-amber-900 transition-colors duration-200 backdrop-blur-sm"
        >
          <Github className="w-5 h-5" />
          <span className="hidden sm:inline">Star on GitHub</span>
        </a>
      </div>

      <div className="w-full max-w-xl mx-auto text-center space-y-12">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-40 h-40 relative mb-4 flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse">
                <BsIncognito className="w-full h-full text-amber-200 opacity-75" />
              </div>
              <BsIncognito className="w-full h-full text-amber-800 relative" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h1 className="font-detective text-5xl md:text-8xl text-amber-900 drop-shadow-lg">
            SQL Noir
          </h1>

          <p className="text-xl md:text-2xl text-amber-800 font-detective">
            Solve mysteries through SQL. Ready to investigate?
          </p>

          <button
            onClick={() => setStarted(true)}
            className="group bg-amber-800/90 hover:bg-amber-700/90 text-amber-100 px-10 py-5 rounded-lg 
                     text-2xl font-detective transition-all duration-300 transform hover:scale-105 
                     flex items-center justify-center mx-auto shadow-lg hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            Start Investigation
            <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
