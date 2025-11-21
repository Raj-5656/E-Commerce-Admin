import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
interface layout {
  children: React.ReactNode
}
const MasterLayout: React.FC<layout> = ({ children }) => {
  //   const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MasterLayout;