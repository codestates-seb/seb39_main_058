//package main.sswitch.filter;
//
//
//import javax.servlet.*;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.io.PrintWriter;
//
//public class doFilter implements Filter {
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//        HttpServletRequest req = (HttpServletRequest) request;
//        HttpServletResponse res = (HttpServletResponse) response;
//
//        res.setCharacterEncoding("UTF-8");
//        if (req.getMethod().equals("POST")) {
//            System.out.println("Post 요청");
//            String headerAuth = req.getHeader("Authorization");
//            System.out.println(headerAuth);
//            if (headerAuth.equals("right")) {
//                chain.doFilter(req, res);
//            } else {
//                PrintWriter writer = res.getWriter();
//                writer.println("인증 실패");
//            }
//        }
//    }
//}
