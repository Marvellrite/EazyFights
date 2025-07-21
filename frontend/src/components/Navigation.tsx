export default function Navigation() {

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-red-600 text-white p-2 rounded-full mr-3">
              <span className="text-lg">🥊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-red-800">EazyFights</h1>
              <p className="text-sm text-red-600">The Self Defense Academy</p>
            </div>
          </div>

          {/* <div className="flex space-x-4">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "outline"}
                className={location.pathname === "/" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Registration
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant={location.pathname === "/admin" ? "default" : "outline"}
                className={location.pathname === "/admin" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                <Users className="w-4 h-4 mr-2" />
                Admin Dashboard
              </Button>
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  )
}
