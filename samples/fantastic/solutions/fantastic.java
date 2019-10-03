import java.io.IOException;

class Main {
	public static void main(String[] args) throws IOException {
		for (int b; (b = System.in.read()) != -1; ) {
			System.out.print((char)b);
		}
		System.out.println(" and it will be fantastic");
	}
}
