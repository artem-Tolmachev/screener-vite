import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { useLoginMutation } from "@/pages/dashboard/coinData/services/getApiCoins";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react"

function LogInComponent(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [login, { data, isSuccess, isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await login({ email, password });
  }

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem('token', data.token);
    }
  }, [isSuccess, data]);

  if (error) {
    alert("Ошибка при регистрации")  
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid flex-1 auto-rows-min gap-3">
            <div className="grid gap-1">
              <Label htmlFor="sheet-demo-name">Почта</Label>
              <Input 
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="sheet-demo-username">
                  Пароль
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:bg-transparent cursor-pointer h-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-2 w-2 text-gray-500" />
                    ) : (
                      <Eye className="h-2 w-2 text-gray-500" />
                    )}
                  </Button>
                </Label>
                <Input 
                  type={showPassword ? "password" : "text" }
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative"
                  />
            </div>
        {isSuccess ? (
          <SheetClose asChild>
            <Button
              variant="default"
              className="bg-lime-800 text-gray-300 hover:bg-lime-700"
            >
              Готово
            </Button>
          </SheetClose>
        ) : (
          <Button
            variant="default"
            className="bg-lime-800 text-gray-300 hover:bg-lime-700 cursor-pointer mt-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </Button>
        )}
        </div>
    </form>
  )
}
export default LogInComponent;
