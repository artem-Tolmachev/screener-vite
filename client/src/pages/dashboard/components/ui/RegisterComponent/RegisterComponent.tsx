import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { useRegisterMutation } from "@/pages/dashboard/coinData/services/getApiCoins";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react"

function RegisterComponent(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);

    const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({ email, password });
    }

    useEffect(() => {
        if (isSuccess) {
        alert("✅ Регистрация успешна!");
        setEmail("");
        setPassword("");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
        alert("❌ Ошибка регистрации");
        }
    }, [error]);

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
                      <EyeOff className="h-2 w-2 text-gray-500"/>
                    ) : (
                      <Eye className="h-2 w-2 text-gray-500"/>
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
              className="bg-lime-800 text-gray-300 hover:bg-lime-700 mt-4"
            >
              Готово
            </Button>
          </SheetClose>
        ) : (
          <Button
            variant="default"
            className="bg-lime-800 text-gray-300 hover:bg-lime-700 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </Button>
        )}
        </div>
    </form>
  )
}
export default RegisterComponent;
