package com.vasecompany.senda

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(colorScheme = darkColorScheme(primary = Color(0xFF13C8EC), secondary = Color(0xFF8B5CF6))) {
                val nav = rememberNavController()
                Surface(color = Color(0xFF101F22), modifier = Modifier.fillMaxSize()) {
                    AppNav(nav)
                }
            }
        }
    }
}

@Composable
fun AppNav(nav: NavHostController) {
    NavHost(navController = nav, startDestination = "onboarding") {
        composable("onboarding") { Screen("Senda 1 · Onboarding", "Continuar") { nav.navigate("signup") } }
        composable("signup") { Screen("Senda 2 · Crear cuenta", "Continuar") { nav.navigate("login") } }
        composable("login") { Screen("Senda 3 · Login", "Entrar") { nav.navigate("dashboard") } }
        composable("dashboard") { Screen("Senda 4 · Dashboard", "Modo Crisis") { nav.navigate("crisis") } }
        composable("crisis") { Screen("Senda 5 · Crisis", "Chat") { nav.navigate("chat") } }
        composable("chat") { Screen("Senda 6 · Chat", "Tracking") { nav.navigate("tracking") } }
        composable("tracking") { Screen("Senda 7 · Tracking", "Accountability") { nav.navigate("accountability") } }
        composable("accountability") { Screen("Senda 8 · Accountability", "Volver al inicio") { nav.navigate("onboarding") } }
    }
}

@Composable
fun Screen(title: String, buttonText: String, onNext: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = title, color = Color(0xFFE9F4F7), fontSize = 28.sp, fontWeight = FontWeight.Bold)
        Spacer(modifier = Modifier.height(16.dp))
        Text(text = "Base Kotlin funcional de Senda", color = Color(0xFFB5CED5))
        Spacer(modifier = Modifier.height(28.dp))
        Button(onClick = onNext, colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF13C8EC), contentColor = Color(0xFF06171B))) {
            Text(buttonText)
        }
    }
}
