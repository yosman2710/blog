import { Toaster } from "./Nueva carpeta/components/ui/toaster";
import { Toaster as Sonner } from "./Nueva carpeta/components/ui/sonner";
import { TooltipProvider } from "./Nueva carpeta/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./Nueva carpeta/components/ProtectedRoute";
import Index from "./pantallas/Introduccion.tsx";
import Login from "./pantallas/Login.tsx";
import Register from "./pantallas/Registro.tsx";
import Posts from "./pantallas/Posts.tsx";
import PostDetail from "./pantallas/PostDetail.tsx";
import Profile from "./pantallas/Profile.tsx";
import NotFound from "./pantallas/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/posts" element={
                            <ProtectedRoute>
                                <Posts />
                            </ProtectedRoute>
                        } />
                        <Route path="/post/:id" element={
                            <ProtectedRoute>
                                <PostDetail />
                            </ProtectedRoute>
                        } />
                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;

