package com.proyectofinal.ReservasApi.configuration;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/auth/**").permitAll()
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                                .requestMatchers(HttpMethod.GET, "/usuarios").permitAll()
                                .requestMatchers(HttpMethod.GET, "/usuarios/usuarioActual").permitAll()
                                .requestMatchers(HttpMethod.GET, "/usuarios/todos").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/usuarios/{id}/role").hasAnyAuthority( "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/productos").permitAll()
                                .requestMatchers(HttpMethod.GET, "/productos/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/productos").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/productos/{id}").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/productos/actualizar-categoria").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/productos/{id}").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/productos/cantidadProductos").permitAll()
                                .requestMatchers(HttpMethod.GET, "/productos/ciudad/{id}").permitAll()
                                .requestMatchers(HttpMethod.GET, "/productos//ciudad-fecha/{id}").permitAll()

                                .requestMatchers(HttpMethod.POST, "/imagenes").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/imagenes/**").permitAll()
                                .requestMatchers(HttpMethod.DELETE, "/imagenes/imagenesDelProducto/{id}").hasAnyAuthority( "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/caracteristicas").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/caracteristicas/{id}").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/caracteristicas").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/caracteristicas/{id}").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/caracteristicas/{id}").hasAnyAuthority( "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/categorias").permitAll()
                                .requestMatchers(HttpMethod.POST, "/categorias").hasAnyAuthority( "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/favoritos/usuario").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/favoritos/{id}").hasAnyAuthority( "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/favoritos").hasAnyAuthority( "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/ciudades").permitAll()

                                .requestMatchers(HttpMethod.GET, "/reservas").permitAll()


                                .requestMatchers(HttpMethod.GET, "/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/v3/api-docs/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll()




                                .anyRequest().authenticated())
                .sessionManagement(
                        session -> session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
}
