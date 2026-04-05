use std::io::{self, Write};
use std::net::{TcpListener, TcpStream};

fn handle_client(mut stream: TcpStream) {
    let response = "HTTP/1.1 200 OK\r\n\r\nHello World";
    stream.write_all(response.as_bytes()).unwrap();
}

//@LonelyFellas 本地网络主函数
pub fn local_network_main() -> io::Result<()> {
    let listener = TcpListener::bind("0.0.0.0:7891")?;
    println!("Listening on 0.0.0.0:7891");

    for stream in listener.incoming() {
        match stream {
            Ok(_stream) => {
                handle_client(_stream);
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
    }
    Ok(())
}
