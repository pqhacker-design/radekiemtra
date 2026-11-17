import { chapter, e, ex, lesson, n, s, v } from './helpers';
import { CurriculumChapter } from './types';

export const GRADE_8_CHAPTERS_1_TO_5: CurriculumChapter[] = [
  chapter(8, 1, 'Polynomials', 'Đa thức nhiều biến', [
    lesson(
      8, 1, 1,
      'Monomials',
      'Đơn thức',
      ['Identify monomials, numerical coefficients, variable parts, and total degree of a monomial.', 'Identify like monomials and add, subtract, or multiply monomials.'],
      ['Nhận biết đơn thức, đơn thức thu gọn, hệ số, phần biến và bậc của đơn thức.', 'Nhận biết đơn thức đồng dạng và thực hiện cộng, trừ, nhân đơn thức.'],
      [
        v('g8l1-v1', 'monomial', 'n', 'đơn thức', 'An algebraic expression consisting of a single number, a variable, or a product of numbers and integer-power variables.', 'Biểu thức đại số chỉ gồm một số, một biến hoặc tích giữa số và các biến với số mũ nguyên không âm.', '$3x^2y$ is a monomial of degree $3$, whereas $x + y$ is not.', '$3x^2y$ là đơn thức bậc $3$, còn $x + y$ không phải đơn thức.'),
        v('g8l1-v2', 'coefficient / variable part', 'n phr', 'hệ số / phần biến', 'The constant factor and the product of variable powers in a simplified monomial.', 'Thừa số bằng số và phần tích các biến trong đơn thức thu gọn.', 'In $-5x^2y^3$, the coefficient is $-5$ and the degree is $2 + 3 = 5$.', 'Trong $-5x^2y^3$, hệ số là $-5$ và bậc là $2 + 3 = 5$.'),
        v('g8l1-v3', 'like monomials', 'n phr', 'đơn thức đồng dạng', 'Nonzero monomials having the exact same variable part (same variables with identical exponents).', 'Các đơn thức khác $0$ có cùng phần biến.', 'To add like monomials, add their coefficients and keep the variable part unchanged.', 'Cộng hai đơn thức đồng dạng bằng cách cộng hệ số và giữ nguyên phần biến.'),
      ],
      [
        n('g8l1-n1', '\\deg(-4x^2yz^3) = 2 + 1 + 3 = 6', 'the degree of negative four x squared y z cubed is six', 'bậc của đơn thức âm 4 x bình y z lập phương là 6'),
      ],
      [
        e('g8l1-e1', 'describe', 'Before finding the degree of a monomial, simplify it by grouping identical variables.', 'Trước khi tìm bậc, phải thu gọn đơn thức bằng cách gom các biến giống nhau.'),
        e('g8l1-e2', 'question', 'Are $4x^2y$ and $-7xy^2$ like monomials?', 'Hai đơn thức $4x^2y$ và $-7xy^2$ có đồng dạng không?'),
        e('g8l1-e3', 'present', 'Adding like terms yields $3x^2y - 7x^2y = -4x^2y$.', 'Cộng các đơn thức đồng dạng ta được $3x^2y - 7x^2y = -4x^2y$.'),
      ],
      [
        ex(
          'g8l1-ex1',
          'Simplifying a product of monomials',
          'Thu gọn tích các đơn thức',
          'Multiply $(-2x^2y)$ and $(3xy^3)$, then state the coefficient, variable part, and degree.',
          'Tính tích $(-2x^2y) \\cdot (3xy^3)$ rồi xác định hệ số, phần biến và bậc.',
          [
            s('Step 1: Multiply coefficients and variables', 'Bước 1: Nhân hệ số và lũy thừa từng biến', '$(-2 \\cdot 3)(x^2 \\cdot x)(y \\cdot y^3) = -6x^3y^4$.', '$(-2 \\cdot 3)(x^2 \\cdot x)(y \\cdot y^3) = -6x^3y^4$.'),
            s('Step 2: Read characteristics', 'Bước 2: Xác định hệ số, phần biến, bậc', 'Coefficient: $-6$; variable part: $x^3y^4$; degree: $3 + 4 = 7$.', 'Hệ số $-6$; phần biến $x^3y^4$; bậc $3 + 4 = 7$.'),
          ],
          'Simplified monomial is $-6x^3y^4$ of degree $7$.',
          'Đơn thức thu gọn là $-6x^3y^4$, có bậc $7$.'
        ),
      ],
      ['Lưu ý đặc biệt: $0$ được gọi là đơn thức không (không có bậc), khác với hằng số khác $0$ (bậc $0$).']
    ),
    lesson(
      8, 1, 2,
      'Polynomials',
      'Đa thức',
      ['Define a multivariable polynomial and simplify it by combining like terms.', 'Find the degree of a multivariable polynomial (highest degree among its nonzero terms).'],
      ['Nêu khái niệm đa thức nhiều biến và thu gọn đa thức.', 'Tìm bậc của đa thức nhiều biến sau khi thu gọn.'],
      [
        v('g8l2-v1', 'polynomial / term', 'n', 'đa thức / hạng tử', 'A sum of monomials; each monomial in the sum is a term of the polynomial.', 'Tổng của những đơn thức; mỗi đơn thức trong tổng gọi là một hạng tử.', 'Combine all like terms before stating the degree of a polynomial.', 'Phải thu gọn hết các hạng tử đồng dạng rồi mới tìm bậc của đa thức.'),
        v('g8l2-v2', 'degree of a polynomial', 'n phr', 'bậc của đa thức', 'The greatest degree among the terms in the simplified form of the polynomial.', 'Bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức.', 'The degree of $x^3y - 4x^2 + y^2$ is $4$.', 'Đa thức $x^3y - 4x^2 + y^2$ có bậc $4$.'),
      ],
      [
        n('g8l2-n1', '\\deg(x^2y^2 + xy - 5) = 4', 'the degree of the polynomial is four', 'bậc của đa thức là 4'),
      ],
      [
        e('g8l2-e1', 'describe', 'Every monomial is also considered a polynomial with just one term.', 'Mỗi đơn thức cũng được coi là một đa thức gồm một hạng tử.'),
        e('g8l2-e2', 'question', 'Why must we simplify $x^2y + 3x - x^2y$ before finding its degree?', 'Tại sao ta phải thu gọn $x^2y + 3x - x^2y$ trước khi xác định bậc?'),
        e('g8l2-e3', 'present', 'Since $x^2y - x^2y = 0$, the polynomial reduces to $3x$, which has degree $1$.', 'Vì $x^2y - x^2y = 0$ nên đa thức rút gọn còn $3x$, có bậc $1$.'),
      ],
      [
        ex(
          'g8l2-ex1',
          'Simplifying and finding degree',
          'Thu gọn và tìm bậc đa thức nhiều biến',
          'Simplify $P = 2x^2y + 3xy - 2x^2y + y^3 - 1$ and find its degree.',
          'Thu gọn $P = 2x^2y + 3xy - 2x^2y + y^3 - 1$ và tìm bậc của $P$.',
          [
            s('Step 1: Cancel opposite terms', 'Bước 1: Triệt tiêu các hạng tử đối nhau', '$2x^2y - 2x^2y = 0$, leaving $P = 3xy + y^3 - 1$.', '$P = 3xy + y^3 - 1$.'),
            s('Step 2: Compare term degrees', 'Bước 2: So sánh bậc các hạng tử', '$\\deg(3xy) = 2$, $\\deg(y^3) = 3$, $\\deg(-1) = 0$. Maximum is $3$.', 'Hạng tử bậc cao nhất là $y^3$ có bậc $3$.'),
          ],
          'Simplified form is $3xy + y^3 - 1$, degree $3$.',
          'Dạng thu gọn là $3xy + y^3 - 1$, bậc $3$.'
        ),
      ],
      ['Cảnh báo lỗi sai phổ biến: nhìn vào $2x^2y$ chưa triệt tiêu đã vội kết luận bậc $3$ nếu hạng tử còn lại bậc nhỏ hơn.']
    ),
    lesson(
      8, 1, 3,
      'Addition and Subtraction of Polynomials',
      'Phép cộng và phép trừ đa thức',
      ['Add and subtract multivariable polynomials accurately with parentheses and sign changes.', 'Determine missing polynomials $C$ from $A + C = B$ or $A - C = B$.'],
      ['Thực hiện cộng, trừ hai đa thức nhiều biến.', 'Tìm đa thức $C$ thỏa mãn $A + C = B$ hoặc $A - C = B$.'],
      [
        v('g8l3-v1', 'sum / difference of polynomials', 'n phr', 'tổng / hiệu của hai đa thức', 'Combining terms of two polynomials by adding or subtracting like terms.', 'Cộng hoặc trừ hai đa thức bằng cách thu gọn các hạng tử đồng dạng.', 'Remove parentheses preceded by a minus sign by flipping all signs inside.', 'Bỏ ngoặc có dấu trừ đằng trước thì đổi dấu mọi hạng tử bên trong.'),
      ],
      [
        n('g8l3-n1', 'A - (B - C) = A - B + C', 'subtracting B minus C from A equals A minus B plus C', 'lấy A trừ mở ngoặc B trừ C bằng A trừ B cộng C'),
      ],
      [
        e('g8l3-e1', 'describe', 'Group like terms carefully with their preceding signs before summing their coefficients.', 'Nhóm các hạng tử đồng dạng kèm theo dấu đứng trước chúng rồi cộng các hệ số.'),
        e('g8l3-e2', 'question', 'How do we find polynomial $M$ if $M - (x^2 + y^2) = 2xy$?', 'Tìm đa thức $M$ như thế nào nếu $M - (x^2 + y^2) = 2xy$?'),
        e('g8l3-e3', 'present', 'Adding $(x^2 + y^2)$ to both sides gives $M = x^2 + 2xy + y^2$.', 'Chuyển $-(x^2 + y^2)$ sang vế phải, ta được $M = x^2 + 2xy + y^2$.'),
      ],
      [
        ex(
          'g8l3-ex1',
          'Subtracting multivariable polynomials',
          'Trừ hai đa thức nhiều biến',
          'Given $A = 3x^2 - 2xy + y^2$ and $B = x^2 - 2xy + 4y^2$, compute $A - B$.',
          'Cho $A = 3x^2 - 2xy + y^2$ và $B = x^2 - 2xy + 4y^2$. Tính $A - B$.',
          [
            s('Step 1: Write with parentheses and expand signs', 'Bước 1: Viết ngoặc và bỏ ngoặc đổi dấu', '$A - B = (3x^2 - 2xy + y^2) - (x^2 - 2xy + 4y^2) = 3x^2 - 2xy + y^2 - x^2 + 2xy - 4y^2$.', '$A - B = 3x^2 - 2xy + y^2 - x^2 + 2xy - 4y^2$.'),
            s('Step 2: Combine like terms', 'Bước 2: Thu gọn hạng tử đồng dạng', '$= (3 - 1)x^2 + (-2 + 2)xy + (1 - 4)y^2 = 2x^2 - 3y^2$.', '$= 2x^2 - 3y^2$.'),
          ],
          'Thus, $A - B = 2x^2 - 3y^2$.',
          'Vậy $A - B = 2x^2 - 3y^2$.'
        ),
      ],
      ['Luôn giữ thói quen đặt đa thức thứ hai trong ngoặc đơn ở dòng đầu tiên của phép trừ.']
    ),
    lesson(
      8, 1, 4,
      'Multiplication of Polynomials',
      'Phép nhân đa thức',
      ['Multiply a monomial by a polynomial and multiply two multivariable polynomials.', 'Prove an expression is independent of its variables by expanding and simplifying.'],
      ['Thực hiện nhân đơn thức với đa thức và nhân đa thức với đa thức.', 'Chứng minh giá trị biểu thức không phụ thuộc vào biến sau khi rút gọn.'],
      [
        v('g8l4-v1', 'expand the product', 'v phr', 'khai triển tích', 'Multiply each term of the first polynomial by every term of the second.', 'Nhân lần lượt từng hạng tử của đa thức thứ nhất với từng hạng tử của đa thức thứ hai.', 'Expand $(x - 2y)(x + 3y)$ and combine like terms.', 'Khai triển $(x - 2y)(x + 3y)$ rồi thu gọn.'),
        v('g8l4-v2', 'independent of variables', 'adj phr', 'không phụ thuộc vào biến', 'An expression that simplifies to a constant number regardless of variable values.', 'Biểu thức sau rút gọn chỉ còn một hằng số.', 'Show that the expression value is independent of $x$ and $y$.', 'Chứng tỏ giá trị biểu thức không phụ thuộc vào $x, y$.'),
      ],
      [
        n('g8l4-n1', 'A(B + C) = AB + AC', 'monomial A times polynomial B plus C equals AB plus AC', 'nhân đơn thức với đa thức'),
      ],
      [
        e('g8l4-e1', 'describe', 'After multiplying every pair of terms, check if any variable terms cancel completely.', 'Sau khi nhân xong mọi cặp hạng tử, kiểm tra xem các hạng tử chứa biến có triệt tiêu hết không.'),
        e('g8l4-e2', 'question', 'What happens to the variable terms in $x(x - 3) - (x - 1)(x - 2)$?', 'Các hạng tử chứa $x$ trong $x(x - 3) - (x - 1)(x - 2)$ biến đổi thế nào?'),
        e('g8l4-e3', 'present', 'Expanding gives $x^2 - 3x - (x^2 - 3x + 2) = -2$, a constant independent of $x$.', 'Khai triển cho kết quả $x^2 - 3x - (x^2 - 3x + 2) = -2$, không phụ thuộc vào $x$.'),
      ],
      [
        ex(
          'g8l4-ex1',
          'Expanding and simplifying a product',
          'Nhân đa thức và chứng minh không phụ thuộc biến',
          'Simplify $E = (x - 2y)(x + 2y) - x(x - 1) + 4y^2 - x$.',
          'Rút gọn $E = (x - 2y)(x + 2y) - x(x - 1) + 4y^2 - x$.',
          [
            s('Step 1: Multiply pairs', 'Bước 1: Thực hiện phép nhân', '$(x - 2y)(x + 2y) = x^2 + 2xy - 2xy - 4y^2 = x^2 - 4y^2$; $-x(x - 1) = -x^2 + x$.', '$(x - 2y)(x + 2y) = x^2 - 4y^2$; $-x(x - 1) = -x^2 + x$.'),
            s('Step 2: Combine all terms', 'Bước 2: Thu gọn toàn bộ', '$E = x^2 - 4y^2 - x^2 + x + 4y^2 - x = 0$.', '$E = 0$.'),
          ],
          '$E = 0$, independent of $x$ and $y$.',
          '$E = 0$, không phụ thuộc vào $x$ và $y$.'
        ),
      ],
      ['Dạy thêm mẹo kiểm tra bằng cách thay thử $x = 1, y = 2$ trước và sau khi khai triển để phát hiện lỗi dấu.']
    ),
    lesson(
      8, 1, 5,
      'Division of Polynomials by Monomials',
      'Phép chia đa thức cho đơn thức',
      ['Verify the divisibility condition for monomial-by-monomial and polynomial-by-monomial division.', 'Divide every term of a polynomial by the nonzero monomial divisor.'],
      ['Kiểm tra điều kiện chia hết của đơn thức và đa thức cho đơn thức.', 'Chia từng hạng tử của đa thức cho đơn thức rồi cộng các kết quả.'],
      [
        v('g8l5-v1', 'divisible by a monomial', 'adj phr', 'chia hết cho đơn thức', 'Monomial $A$ is divisible by $B \\ne 0$ when every variable of $B$ appears in $A$ with an exponent greater than or equal to its exponent in $B$.', 'Mỗi biến của đơn thức chia đều là biến của đơn thức bị chia với số mũ không lớn hơn.', '$6x^3y^2$ is divisible by $2xy$, whereas $6x^3y^2$ is not divisible by $xy^3$.', '$6x^3y^2$ chia hết cho $2xy$, nhưng không chia hết cho $xy^3$.'),
      ],
      [
        n('g8l5-n1', '(A + B + C) : M = A:M + B:M + C:M', 'divide each term of the polynomial individually by the monomial M', 'chia từng hạng tử của đa thức cho đơn thức M'),
      ],
      [
        e('g8l5-e1', 'describe', 'A polynomial is divisible by a monomial $M$ if and only if every single term of the polynomial is divisible by $M$.', 'Đa thức chia hết cho đơn thức $M$ khi mọi hạng tử của đa thức đều chia hết cho $M$.'),
        e('g8l5-e2', 'question', 'Is $8x^2y^3 - 4x^3y^2$ divisible by $2x^2y^2$?', 'Đa thức $8x^2y^3 - 4x^3y^2$ có chia hết cho $2x^2y^2$ không?'),
        e('g8l5-e3', 'present', 'Dividing term by term gives $4y - 2x$.', 'Chia từng hạng tử cho $2x^2y^2$ ta được kết quả $4y - 2x$.'),
      ],
      [
        ex(
          'g8l5-ex1',
          'Dividing a polynomial by a monomial',
          'Chia đa thức cho đơn thức',
          'Evaluate $(12x^4y^2 - 6x^3y^3 + 3x^2y^2) : (-3x^2y^2)$.',
          'Tính $(12x^4y^2 - 6x^3y^3 + 3x^2y^2) : (-3x^2y^2)$.',
          [
            s('Step 1: Divide each term by $-3x^2y^2$', 'Bước 1: Chia lần lượt từng hạng tử', '$12x^4y^2 : (-3x^2y^2) = -4x^2$; $-6x^3y^3 : (-3x^2y^2) = +2xy$; $3x^2y^2 : (-3x^2y^2) = -1$.', 'Lần lượt được $-4x^2$, $+2xy$, $-1$.'),
            s('Step 2: Sum quotients', 'Bước 2: Viết tổng các thương', '$-4x^2 + 2xy - 1$.', '$-4x^2 + 2xy - 1$.'),
          ],
          'The quotient is $-4x^2 + 2xy - 1$.',
          'Thương là $-4x^2 + 2xy - 1$.'
        ),
      ],
      ['Lỗi hay gặp: quên chia hạng tử cuối cùng hoặc ghi $(3x^2y^2) : (3x^2y^2) = 0$ thay vì $1$.']
    ),
  ]),
  chapter(8, 2, 'Notable Algebraic Identities and Applications', 'Hằng đẳng thức đáng nhớ và ứng dụng', [
    lesson(
      8, 2, 6,
      'Difference of Two Squares. Square of a Sum or Difference',
      'Hiệu hai bình phương. Bình phương của một tổng hay một hiệu',
      ['State and apply $(a+b)^2$, $(a-b)^2$, and $a^2 - b^2$ fluently in both directions (expanding and factoring).', 'Use identities for rapid mental arithmetic like $99^2$ or $101 \\cdot 99$.'],
      ['Thuộc và vận dụng hai chiều ba hằng đẳng thức $(A+B)^2, (A-B)^2, A^2 - B^2$.', 'Áp dụng hằng đẳng thức để tính nhanh $99^2$ hay $101 \\cdot 99$.'],
      [
        v('g8l6-v1', 'algebraic identity', 'n phr', 'hằng đẳng thức', 'An equality between two expressions that holds true for all values of the variables.', 'Đẳng thức đúng với mọi giá trị của các biến.', 'The first three notable algebraic identities involve squares.', 'Ba hằng đẳng thức đầu tiên liên quan đến bình phương.'),
        v('g8l6-v2', 'difference of two squares', 'n phr', 'hiệu hai bình phương', 'Identity $A^2 - B^2 = (A - B)(A + B)$.', 'Hằng đẳng thức $A^2 - B^2 = (A - B)(A + B)$.', 'Factor $x^2 - 9$ as a difference of two squares: $(x - 3)(x + 3)$.', 'Phân tích $x^2 - 9 = (x - 3)(x + 3)$ theo hiệu hai bình phương.'),
        v('g8l6-v3', 'square of a sum / difference', 'n phr', 'bình phương của một tổng / một hiệu', '$(A \\pm B)^2 = A^2 \\pm 2AB + B^2$.', 'Bình phương số thứ nhất cộng (trừ) hai lần tích cộng bình phương số thứ hai.', 'Never forget the middle term $2AB$ when expanding $(A + B)^2$.', 'Đừng bao giờ quên hạng tử $2AB$ ở giữa khi khai triển $(A + B)^2$.'),
      ],
      [
        n('g8l6-n1', 'A^2 - B^2 = (A - B)(A + B)', 'A squared minus B squared equals A minus B times A plus B', 'A bình trừ B bình bằng mở ngoặc A trừ B nhân mở ngoặc A cộng B'),
      ],
      [
        e('g8l6-e1', 'describe', 'The square of any real expression is always non-negative: $(A - B)^2 \\ge 0$.', 'Bình phương của một biểu thức bất kì luôn không âm.'),
        e('g8l6-e2', 'question', 'How can we calculate $98^2$ mentally using the square of a difference?', 'Ta tính nhẩm $98^2$ bằng bình phương của một hiệu như thế nào?'),
        e('g8l6-e3', 'present', 'Writing $98 = 100 - 2$ gives $(100 - 2)^2 = 10\\,000 - 400 + 4 = 9\\,604$.', 'Viết $98 = 100 - 2$ ta được $10\\,000 - 400 + 4 = 9\\,604$.'),
      ],
      [
        ex(
          'g8l6-ex1',
          'Mental math and rewriting as a square',
          'Tính nhanh và viết dưới dạng bình phương',
          'Calculate $47 \\cdot 53$ mentally and write $9x^2 - 12x + 4$ as a square.',
          'Tính nhanh $47 \\cdot 53$ và viết $9x^2 - 12x + 4$ thành bình phương của một hiệu.',
          [
            s('Step 1: Difference of squares for $47 \\cdot 53$', 'Bước 1: Dùng hiệu hai bình phương cho $47 \\cdot 53$', '$47 \\cdot 53 = (50 - 3)(50 + 3) = 50^2 - 3^2 = 2\\,500 - 9 = 2\\,491$.', '$47 \\cdot 53 = (50-3)(50+3) = 2\\,500 - 9 = 2\\,491$.'),
            s('Step 2: Factor $9x^2 - 12x + 4$', 'Bước 2: Thu gọn tam thức bậc hai', '$9x^2 - 12x + 4 = (3x)^2 - 2(3x)(2) + 2^2 = (3x - 2)^2$.', '$9x^2 - 12x + 4 = (3x - 2)^2$.'),
          ],
          '$47 \\cdot 53 = 2\\,491$ and $9x^2 - 12x + 4 = (3x - 2)^2$.',
          'Vậy $47 \\cdot 53 = 2\\,491$ và $9x^2 - 12x + 4 = (3x - 2)^2$.'
        ),
      ],
      ['Khắc phục lỗi kinh điển "(a+b)^2 = a^2 + b^2" bằng minh họa diện tích hình vuông cạnh $a+b$.']
    ),
    lesson(
      8, 2, 7,
      'Cube of a Sum or a Difference',
      'Lập phương của một tổng hay một hiệu',
      ['Expand and recognize $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ and $(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$.', 'Compress four-term cubic polynomials back into $(A \\pm B)^3$.'],
      ['Khai triển và nhận dạng ngược hai hằng đẳng thức lập phương của tổng, hiệu.', 'Rút gọn đa thức bốn hạng tử về dạng $(A \\pm B)^3$.'],
      [
        v('g8l7-v1', 'cube of a sum / cube of a difference', 'n phr', 'lập phương của một tổng / một hiệu', 'Identities $(A + B)^3$ and $(A - B)^3$ having coefficients $1, 3, 3, 1$.', 'Hai hằng đẳng thức bậc ba với bộ hệ số $1, 3, 3, 1$ (đan dấu $+, -, +, -$ cho hiệu).', 'Notice the alternating signs $+, -, +, -$ in the expansion of $(A - B)^3$.', 'Chú ý dấu đan xen $+, -, +, -$ khi khai triển $(A - B)^3$.'),
      ],
      [
        n('g8l7-n1', '(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3', 'A minus B all cubed equals A cubed minus three A squared B plus three A B squared minus B cubed', 'lập phương của A trừ B bằng A mũ 3 trừ 3 A bình B cộng 3 A B bình trừ B mũ 3'),
      ],
      [
        e('g8l7-e1', 'describe', 'In $(A \\pm B)^3$, the exponents of $A$ decrease from $3$ to $0$ while the exponents of $B$ increase from $0$ to $3$.', 'Trong khai triển $(A \\pm B)^3$, số mũ của $A$ giảm từ $3$ về $0$, còn số mũ của $B$ tăng từ $0$ lên $3$.'),
        e('g8l7-e2', 'question', 'How can we quickly compute $x^3 + 3x^2 + 3x + 1$ when $x = 99$?', 'Tính nhanh $x^3 + 3x^2 + 3x + 1$ tại $x = 99$ như thế nào?'),
        e('g8l7-e3', 'present', 'Rewriting it as $(x + 1)^3$ yields $(99 + 1)^3 = 100^3 = 1\\,000\\,000$.', 'Viết lại thành $(x + 1)^3$ ta tính được $100^3 = 1\\,000\\,000$.'),
      ],
      [
        ex(
          'g8l7-ex1',
          'Expanding and compressing a cube',
          'Khai triển và viết gọn lập phương',
          'Expand $(2x - 1)^3$ and rewrite $x^3 - 6x^2 + 12x - 8$ as a cube.',
          'Khai triển $(2x - 1)^3$ và viết $x^3 - 6x^2 + 12x - 8$ dưới dạng lập phương một hiệu.',
          [
            s('Step 1: Expand $(2x - 1)^3$', 'Bước 1: Khai triển $(2x - 1)^3$', '$(2x)^3 - 3(2x)^2(1) + 3(2x)(1)^2 - 1^3 = 8x^3 - 12x^2 + 6x - 1$.', '$= 8x^3 - 12x^2 + 6x - 1$.'),
            s('Step 2: Compress $x^3 - 6x^2 + 12x - 8$', 'Bước 2: Thu gọn $x^3 - 6x^2 + 12x - 8$', '$x^3 - 3\\cdot x^2 \\cdot 2 + 3\\cdot x \\cdot 2^2 - 2^3 = (x - 2)^3$.', '$= (x - 2)^3$.'),
          ],
          'Expansion is $8x^3 - 12x^2 + 6x - 1$; compressed form is $(x - 2)^3$.',
          'Kết quả khai triển là $8x^3 - 12x^2 + 6x - 1$; dạng gọn là $(x - 2)^3$.'
        ),
      ],
      ['Nhắc học sinh giữ ngoặc $(2x)^3 = 8x^3$ để tránh quên lập phương hệ số $2$.']
    ),
    lesson(
      8, 2, 8,
      'Sum and Difference of Two Cubes',
      'Tổng và hiệu hai lập phương',
      ['Distinguish "sum/difference of two cubes" ($A^3 \\pm B^3$) from "cube of a sum/difference" ($(A \\pm B)^3$).', 'Factor and multiply using $A^3 + B^3 = (A+B)(A^2 - AB + B^2)$ and $A^3 - B^3 = (A-B)(A^2 + AB + B^2)$.'],
      ['Phân biệt rành mạch "tổng/hiệu hai lập phương" với "lập phương của một tổng/hiệu".', 'Phân tích $A^3 \\pm B^3$ bằng khái niệm bình phương thiếu.'],
      [
        v('g8l8-v1', 'sum of two cubes / difference of two cubes', 'n phr', 'tổng hai lập phương / hiệu hai lập phương', 'Identities factoring $A^3 + B^3$ and $A^3 - B^3$ into a linear factor and a quadratic trinomial.', 'Hai hằng đẳng thức phân tích $A^3 \\pm B^3$ thành tích bậc nhất với bình phương thiếu.', 'Notice there is no factor of $2$ in the middle term $AB$ of the quadratic factor.', 'Chú ý biểu thức bậc hai là bình phương thiếu (hệ số ở giữa là $AB$, không có số $2$).'),
      ],
      [
        n('g8l8-n1', 'A^3 + B^3 = (A + B)(A^2 - AB + B^2)', 'A cubed plus B cubed equals A plus B times the quantity A squared minus A B plus B squared', 'tổng hai lập phương bằng tổng nhân bình phương thiếu của hiệu'),
      ],
      [
        e('g8l8-e1', 'describe', 'The linear factor keeps the original sign ($+$ or $-$), while the middle term in the quadratic factor takes the opposite sign.', 'Nhân tử bậc nhất giữ nguyên dấu, còn hạng tử giữa của bình phương thiếu lấy dấu ngược lại.'),
        e('g8l8-e2', 'question', 'How is $x^3 + 27$ factored using the sum of two cubes?', 'Phân tích $x^3 + 27$ theo tổng hai lập phương như thế nào?'),
        e('g8l8-e3', 'present', 'Writing $27 = 3^3$, we factor $x^3 + 3^3 = (x + 3)(x^2 - 3x + 9)$.', 'Viết $27 = 3^3$, ta phân tích được $(x + 3)(x^2 - 3x + 9)$.'),
      ],
      [
        ex(
          'g8l8-ex1',
          'Factoring and simplifying with cubes',
          'Phân tích và rút gọn dùng tổng, hiệu hai lập phương',
          'Factor $8x^3 - 1$ and simplify $(x + 2)(x^2 - 2x + 4) - x^3$.',
          'Phân tích $8x^3 - 1$ và rút gọn $(x + 2)(x^2 - 2x + 4) - x^3$.',
          [
            s('Step 1: Factor $8x^3 - 1$', 'Bước 1: Viết $8x^3 = (2x)^3$', '$(2x)^3 - 1^3 = (2x - 1)(4x^2 + 2x + 1)$.', '$8x^3 - 1 = (2x - 1)(4x^2 + 2x + 1)$.'),
            s('Step 2: Simplify second expression', 'Bước 2: Nhận dạng hằng đẳng thức', '$(x + 2)(x^2 - 2x + 4) - x^3 = (x^3 + 8) - x^3 = 8$.', '$= (x^3 + 8) - x^3 = 8$.'),
          ],
          'Factored form is $(2x - 1)(4x^2 + 2x + 1)$; simplified value is $8$.',
          'Kết quả phân tích là $(2x - 1)(4x^2 + 2x + 1)$; rút gọn bằng $8$.'
        ),
      ],
      ['Mẹo nhớ dấu tiếng Anh: `SOAP` — Same, Opposite, Always Positive cho ba dấu trong kết quả!']
    ),
    lesson(
      8, 2, 9,
      'Factoring Polynomials',
      'Phân tích đa thức thành nhân tử',
      ['Factor polynomials using GCF, identities, grouping terms, and combining multiple methods.', 'Solve equations of the form $A(x) \\cdot B(x) = 0$ by factoring.'],
      ['Phân tích đa thức thành nhân tử bằng đặt nhân tử chung, hằng đẳng thức và nhóm hạng tử.', 'Giải phương trình tích $A(x) \\cdot B(x) = 0$ sau khi phân tích.'],
      [
        v('g8l9-v1', 'factor / factorize a polynomial', 'v phr', 'phân tích đa thức thành nhân tử', 'Writing a polynomial as a product of lower-degree polynomials and monomials.', 'Biến đổi đa thức thành một tích của những đa thức khác.', 'Always check for a greatest common factor first before using identities.', 'Luôn ưu tiên kiểm tra đặt nhân tử chung đầu tiên trước khi dùng hằng đẳng thức.'),
        v('g8l9-v2', 'grouping method', 'n phr', 'phương pháp nhóm hạng tử', 'Pairing terms that reveal a shared binomial factor after factoring out local common factors.', 'Nhóm các hạng tử thích hợp để làm xuất hiện nhân tử chung mới.', 'Group $(x^2 - y^2) + (2x + 2y)$ to expose $(x + y)$.', 'Nhóm $(x^2 - y^2) + (2x + 2y)$ để xuất hiện nhân tử chung $(x + y)$.'),
      ],
      [
        n('g8l9-n1', 'A \\cdot B = 0 \\Leftrightarrow A = 0 \\text{ or } B = 0', 'a product equals zero if and only if at least one factor equals zero', 'tích bằng 0 khi và chỉ khi có ít nhất một thừa số bằng 0'),
      ],
      [
        e('g8l9-e1', 'describe', 'Factoring completely means every factor in the final product cannot be factored further.', 'Phân tích triệt để nghĩa là các nhân tử ở kết quả cuối cùng không thể phân tích tiếp được nữa.'),
        e('g8l9-e2', 'question', 'What common factor should we pull out first from $3x^3 - 12x$?', 'Nên đặt nhân tử chung nào trước tiên từ $3x^3 - 12x$?'),
        e('g8l9-e3', 'present', 'Pulling out $3x$ gives $3x(x^2 - 4)$, then using difference of squares gives $3x(x - 2)(x + 2)$.', 'Đặt $3x$ ra ngoài được $3x(x^2 - 4)$, dùng tiếp hiệu hai bình phương được $3x(x - 2)(x + 2)$.'),
      ],
      [
        ex(
          'g8l9-ex1',
          'Multi-step factoring and solving',
          'Phân tích nhiều phương pháp và tìm x',
          'Factor $x^2 - 2xy + y^2 - 9$ completely and solve $x^2 - 5x = 0$.',
          'Phân tích đa thức $x^2 - 2xy + y^2 - 9$ thành nhân tử và tìm $x$ biết $x^2 - 5x = 0$.',
          [
            s('Step 1: Group first three terms', 'Bước 1: Nhóm 3 hạng tử đầu thành bình phương', '$(x^2 - 2xy + y^2) - 9 = (x - y)^2 - 3^2 = (x - y - 3)(x - y + 3)$.', '$= (x - y)^2 - 3^2 = (x - y - 3)(x - y + 3)$.'),
            s('Step 2: Solve $x^2 - 5x = 0$', 'Bước 2: Giải $x^2 - 5x = 0$', '$x(x - 5) = 0 \\Rightarrow x = 0$ or $x = 5$.', '$x(x - 5) = 0 \\Rightarrow x = 0$ hoặc $x = 5$.'),
          ],
          'Factored form is $(x - y - 3)(x - y + 3)$; roots are $x = 0, x = 5$.',
          'Đa thức thành $(x - y - 3)(x - y + 3)$; nghiệm $x = 0$ hoặc $x = 5$.'
        ),
      ],
      ['Dạy theo thứ tự ưu tiên 3 bước vàng: (1) Common factor $\\to$ (2) Identity $\\to$ (3) Grouping.']
    ),
  ]),
  chapter(8, 3, 'Quadrilaterals', 'Tứ giác', [
    lesson(
      8, 3, 10,
      'Quadrilaterals',
      'Tứ giác',
      ['Define a convex quadrilateral, its vertices, adjacent/opposite sides, diagonals, and angles.', 'Apply the quadrilateral interior angle-sum theorem ($360^\\circ$).'],
      ['Nêu khái niệm tứ giác lồi, cạnh kề, cạnh đối, đường chéo.', 'Vận dụng định lí tổng bốn góc trong của tứ giác bằng $360^\\circ$.'],
      [
        v('g8l10-v1', 'convex quadrilateral', 'n phr', 'tứ giác lồi', 'A four-sided polygon that always lies completely on one side of any line containing a side.', 'Tứ giác luôn nằm trong cùng một nửa mặt phẳng có bờ là đường thẳng chứa bất kì cạnh nào.', 'By convention, "quadrilateral" refers to a convex quadrilateral.', 'Khi nói tứ giác mà không chú thích gì thêm, ta hiểu đó là tứ giác lồi.'),
        v('g8l10-v2', 'adjacent / opposite sides', 'n phr', 'cạnh kề / cạnh đối', 'Sides sharing a common vertex vs. sides sharing no vertex.', 'Hai cạnh có chung một đỉnh và hai cạnh không có chung đỉnh nào.', 'In quadrilateral $ABCD$, $AB$ and $CD$ are opposite sides.', 'Trong tứ giác $ABCD$, $AB$ và $CD$ là hai cạnh đối.'),
      ],
      [
        n('g8l10-n1', '\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} = 360^\\circ', 'the sum of the four interior angles of a quadrilateral is three hundred sixty degrees', 'tổng bốn góc của một tứ giác bằng 360 độ'),
      ],
      [
        e('g8l10-e1', 'describe', 'Drawing one diagonal splits a quadrilateral into two triangles, explaining why its interior angles sum to $360^\\circ$.', 'Kẻ một đường chéo chia tứ giác thành hai tam giác nên tổng bốn góc bằng $2 \\times 180^\\circ = 360^\\circ$.'),
        e('g8l10-e2', 'question', 'If three angles of a quadrilateral measure $80^\\circ, 95^\\circ,$ and $110^\\circ$, find the fourth angle.', 'Nếu ba góc của tứ giác lần lượt là $80^\\circ, 95^\\circ, 110^\\circ$, tính góc thứ tư.'),
        e('g8l10-e3', 'present', 'Subtracting from $360^\\circ$ gives $360^\\circ - (80^\\circ + 95^\\circ + 110^\\circ) = 75^\\circ$.', 'Lấy $360^\\circ - (80^\\circ + 95^\\circ + 110^\\circ) = 75^\\circ$.'),
      ],
      [
        ex(
          'g8l10-ex1',
          'Finding angles in a quadrilateral',
          'Tính góc tứ giác theo tỉ số',
          'The four angles of quadrilateral $ABCD$ satisfy $\\angle A : \\angle B : \\angle C : \\angle D = 1 : 2 : 3 : 4$. Find each angle.',
          'Bốn góc của tứ giác $ABCD$ tỉ lệ với $1; 2; 3; 4$. Tính số đo mỗi góc.',
          [
            s('Step 1: Set up equation', 'Bước 1: Đặt theo $k$', 'Let the angles be $k, 2k, 3k, 4k$. Then $k + 2k + 3k + 4k = 360^\\circ$.', 'Đặt các góc là $k, 2k, 3k, 4k \\Rightarrow 10k = 360^\\circ$.'),
            s('Step 2: Solve for $k$', 'Bước 2: Tìm $k$ và các góc', '$k = 36^\\circ$, so the angles are $36^\\circ, 72^\\circ, 108^\\circ, 144^\\circ$.', '$k = 36^\\circ$, bốn góc là $36^\\circ, 72^\\circ, 108^\\circ, 144^\\circ$.'),
          ],
          'Angles are $36^\\circ, 72^\\circ, 108^\\circ, 144^\\circ$.',
          'Số đo bốn góc là $36^\\circ; 72^\\circ; 108^\\circ; 144^\\circ$.'
        ),
      ],
      ['Luôn đọc tên đỉnh theo vòng liên tiếp ($ABCD$ hoặc $ADCB$, không đọc chéo $ABDC$).']
    ),
    lesson(
      8, 3, 11,
      'Trapezoids and Isosceles Trapezoids',
      'Hình thang cân',
      ['Define a trapezoid/trapezium (bases, legs) and an isosceles trapezoid.', 'Apply base-angle and diagonal properties and tests for an isosceles trapezoid.'],
      ['Nêu định nghĩa hình thang, hình thang cân.', 'Vận dụng tính chất và dấu hiệu nhận biết hình thang cân.'],
      [
        v('g8l11-v1', 'trapezoid (US) / trapezium (UK)', 'n', 'hình thang', 'A quadrilateral with at least one pair of opposite parallel sides called bases.', 'Tứ giác có hai cạnh đối song song (gọi là hai cạnh đáy).', 'Co-interior angles along each leg of a trapezoid sum to $180^\\circ$.', 'Hai góc kề một cạnh bên của hình thang bù nhau.'),
        v('g8l11-v2', 'isosceles trapezoid', 'n phr', 'hình thang cân', 'A trapezoid with two equal angles along one base.', 'Hình thang có hai góc kề một đáy bằng nhau.', 'In an isosceles trapezoid, the two legs are equal and the two diagonals are equal.', 'Trong hình thang cân, hai cạnh bên bằng nhau và hai đường chéo bằng nhau.'),
      ],
      [
        n('g8l11-n1', 'AB \\parallel CD,\\; \\widehat{C} = \\widehat{D} \\Rightarrow ABCD \\text{ is an isosceles trapezoid}', 'a trapezoid with equal base angles is isosceles', 'hình thang có hai góc kề một đáy bằng nhau là hình thang cân'),
      ],
      [
        e('g8l11-e1', 'describe', 'Careful: equal legs alone do NOT guarantee an isosceles trapezoid, because a general parallelogram also has equal opposite sides.', 'Cẩn thận: hình thang có hai cạnh bên bằng nhau CHƯA CHẮC là hình thang cân (vì có thể là hình bình hành).'),
        e('g8l11-e2', 'question', 'What are the two tests to prove a trapezoid is isosceles?', 'Nêu hai dấu hiệu nhận biết một hình thang là hình thang cân?'),
        e('g8l11-e3', 'present', 'Either prove two base angles are equal, or prove the two diagonals are equal.', 'Chứng minh hình thang có hai góc kề một đáy bằng nhau, hoặc hai đường chéo bằng nhau.'),
      ],
      [
        ex(
          'g8l11-ex1',
          'Angles of an isosceles trapezoid',
          'Tính góc hình thang cân',
          'Isosceles trapezoid $ABCD$ ($AB \\parallel CD$) has $\\angle D = 65^\\circ$. Find $\\angle C, \\angle A, \\angle B$.',
          'Hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{D} = 65^\\circ$. Tính $\\widehat{C}, \\widehat{A}, \\widehat{B}$.',
          [
            s('Step 1: Find $\\angle C$', 'Bước 1: Tính $\\widehat{C}$', 'Base angles along $CD$ are equal: $\\angle C = \\angle D = 65^\\circ$.', '$\\widehat{C} = \\widehat{D} = 65^\\circ$.'),
            s('Step 2: Find $\\angle A$ and $\\angle B$', 'Bước 2: Tính $\\widehat{A}$ và $\\widehat{B}$', 'Since $AB \\parallel CD$, $\\angle A = 180^\\circ - 65^\\circ = 115^\\circ = \\angle B$.', 'Vì $AB \\parallel CD$ nên $\\widehat{A} = \\widehat{B} = 180^\\circ - 65^\\circ = 115^\\circ$.'),
          ],
          '$\\angle C = 65^\\circ$, and $\\angle A = \\angle B = 115^\\circ$.',
          'Vậy $\\widehat{C} = 65^\\circ$, $\\widehat{A} = \\widehat{B} = 115^\\circ$.'
        ),
      ],
      ['Cảnh báo dấu hiệu sai hay gặp: không có dấu hiệu "hình thang có 2 cạnh bên bằng nhau là hình thang cân"!']
    ),
    lesson(
      8, 3, 12,
      'Parallelograms',
      'Hình bình hành',
      ['State properties of sides, angles, and diagonals of a parallelogram.', 'Apply the five identification criteria to prove a quadrilateral is a parallelogram.'],
      ['Phát biểu tính chất về cạnh đối, góc đối, đường chéo hình bình hành.', 'Vận dụng $5$ dấu hiệu nhận biết hình bình hành trong chứng minh.'],
      [
        v('g8l12-v1', 'parallelogram', 'n', 'hình bình hành', 'A quadrilateral with both pairs of opposite sides parallel.', 'Tứ giác có các cạnh đối song song.', 'The diagonals of a parallelogram bisect each other.', 'Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường.'),
        v('g8l12-v2', 'bisect each other', 'v phr', 'cắt nhau tại trung điểm mỗi đường', 'Two segments cutting each other right at both of their midpoints.', 'Hai đoạn thẳng chia đôi lẫn nhau tại giao điểm.', 'If $AC$ and $BD$ bisect each other, then $ABCD$ is a parallelogram.', 'Nếu $AC$ và $BD$ cắt nhau tại trung điểm mỗi đường thì $ABCD$ là hình bình hành.'),
      ],
      [
        n('g8l12-n1', 'AB \\parallel CD \\text{ and } AB = CD \\Rightarrow ABCD \\text{ is a parallelogram}', 'one pair of opposite sides both parallel and equal makes a parallelogram', 'một cặp cạnh đối vừa song song vừa bằng nhau tạo thành hình bình hành'),
      ],
      [
        e('g8l12-e1', 'describe', 'In a parallelogram, consecutive angles are supplementary ($180^\\circ$) and opposite angles are equal.', 'Trong hình bình hành, hai góc kề một cạnh bù nhau và hai góc đối bằng nhau.'),
        e('g8l12-e2', 'question', 'Which single pair of sides needs to be both parallel and equal to form a parallelogram?', 'Chỉ cần điều kiện gì trên đúng một cặp cạnh đối để tứ giác là hình bình hành?'),
        e('g8l12-e3', 'present', 'Since $AE \\parallel CF$ and $AE = CF$, quadrilateral $AECF$ is a parallelogram.', 'Vì $AE \\parallel CF$ và $AE = CF$ nên tứ giác $AECF$ là hình bình hành.'),
      ],
      [
        ex(
          'g8l12-ex1',
          'Proving a parallelogram inside a parallelogram',
          'Chứng minh hình bình hành',
          'In parallelogram $ABCD$, let $M, N$ be the midpoints of $AB$ and $CD$. Prove $AMCN$ is a parallelogram.',
          'Cho hình bình hành $ABCD$, $M$ và $N$ lần lượt là trung điểm $AB, CD$. Chứng minh $AMCN$ là hình bình hành.',
          [
            s('Step 1: Parallel opposite sides', 'Bước 1: Chỉ ra song song', 'Since $ABCD$ is a parallelogram, $AB \\parallel CD$, so $AM \\parallel CN$.', 'Vì $ABCD$ là hình bình hành nên $AB \\parallel CD \\Rightarrow AM \\parallel CN$.'),
            s('Step 2: Equal opposite sides', 'Bước 2: Chỉ ra bằng nhau', '$AB = CD$ and $M, N$ are midpoints, so $AM = \\frac{1}{2}AB = \\frac{1}{2}CD = CN$.', 'Lại có $AB = CD \\Rightarrow AM = CN$.'),
          ],
          'With one pair of sides both parallel and equal, $AMCN$ is a parallelogram.',
          'Tứ giác $AMCN$ có một cặp cạnh đối vừa song song vừa bằng nhau nên là hình bình hành.'
        ),
      ],
      ['Dấu hiệu được dùng nhiều nhất trong chứng minh thực tế: 1 cặp cạnh đối vừa song song vừa bằng nhau, hoặc 2 đường chéo cắt nhau tại trung điểm mỗi đường.']
    ),
    lesson(
      8, 3, 13,
      'Rectangles',
      'Hình chữ nhật',
      ['Apply rectangle properties and the right-triangle median theorem ($AM = \\frac{1}{2}BC$).', 'Prove a quadrilateral is a rectangle from parallelogram or right-angle criteria.'],
      ['Vận dụng tính chất hình chữ nhật và định lí đường trung tuyến ứng với cạnh huyền.', 'Chứng minh tứ giác là hình chữ nhật qua các dấu hiệu nhận biết.'],
      [
        v('g8l13-v1', 'rectangle', 'n', 'hình chữ nhật', 'A quadrilateral with four right angles; it inherits all parallelogram and isosceles-trapezoid properties.', 'Tứ giác có bốn góc vuông; có đầy đủ tính chất của hình bình hành và hình thang cân.', 'A parallelogram with one right angle or with equal diagonals is a rectangle.', 'Hình bình hành có một góc vuông hoặc có hai đường chéo bằng nhau là hình chữ nhật.'),
      ],
      [
        n('g8l13-n1', '\\triangle ABC \\text{ right at } A,\\; AM \\text{ median} \\Rightarrow AM = \\frac{1}{2}BC', 'the median to the hypotenuse equals half the hypotenuse', 'đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền'),
      ],
      [
        e('g8l13-e1', 'describe', 'In any right triangle, the median drawn to the hypotenuse equals half the hypotenuse.', 'Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng một nửa cạnh huyền.'),
        e('g8l13-e2', 'question', 'Conversely, if a triangle has a median equal to half the corresponding side, what can we conclude?', 'Ngược lại, nếu một tam giác có trung tuyến bằng nửa cạnh tương ứng thì ta suy ra được gì?'),
        e('g8l13-e3', 'present', 'Since $ABCD$ has three right angles ($\\angle A = \\angle B = \\angle D = 90^\\circ$), it is a rectangle.', 'Vì tứ giác có ba góc vuông nên đó là hình chữ nhật.'),
      ],
      [
        ex(
          'g8l13-ex1',
          'Median to the hypotenuse in a right triangle',
          'Tính trung tuyến ứng với cạnh huyền',
          'Right triangle $ABC$ at $A$ has legs $AB = 6\\text{ cm}, AC = 8\\text{ cm}$, and median $AM$. Find $BC$ and $AM$.',
          'Tam giác $ABC$ vuông tại $A$ có $AB = 6\\text{ cm}, AC = 8\\text{ cm}$, trung tuyến $AM$. Tính $BC$ và $AM$.',
          [
            s('Step 1: Find hypotenuse $BC$', 'Bước 1: Tính cạnh huyền $BC$ theo Pythagore', '$BC = \\sqrt{6^2 + 8^2} = 10\\text{ cm}$.', '$BC = \\sqrt{6^2 + 8^2} = 10\\text{ cm}$.'),
            s('Step 2: Apply median property', 'Bước 2: Tính trung tuyến $AM$', '$AM = \\frac{1}{2}BC = \\frac{10}{2} = 5\\text{ cm}$.', '$AM = \\frac{1}{2}BC = 5\\text{ cm}$.'),
          ],
          'Thus $BC = 10\\text{ cm}$ and $AM = 5\\text{ cm}$.',
          'Vậy $BC = 10\\text{ cm}$ và $AM = 5\\text{ cm}$.'
        ),
      ],
      ['Định lí đảo của trung tuyến bằng nửa cạnh đối là công cụ cực mạnh để chứng minh góc vuông ($90^\\circ$).']
    ),
    lesson(
      8, 3, 14,
      'Rhombi and Squares',
      'Hình thoi và hình vuông',
      ['State properties and identification signs of a rhombus (plural: rhombi/rhombuses) and a square.', 'Connect the hierarchy: Square = Rectangle + Rhombus.'],
      ['Nêu tính chất và dấu hiệu nhận biết hình thoi, hình vuông.', 'Vận dụng sơ đồ quan hệ: Hình vuông vừa là hình chữ nhật vừa là hình thoi.'],
      [
        v('g8l14-v1', 'rhombus (pl. rhombi)', 'n', 'hình thoi', 'A quadrilateral with four equal sides; its diagonals are perpendicular and bisect its angles.', 'Tứ giác có bốn cạnh bằng nhau; hai đường chéo vuông góc và là đường phân giác các góc.', 'A parallelogram with perpendicular diagonals is a rhombus.', 'Hình bình hành có hai đường chéo vuông góc là hình thoi.'),
        v('g8l14-v2', 'square', 'n', 'hình vuông', 'A quadrilateral with four right angles and four equal sides.', 'Tứ giác có bốn góc vuông và bốn cạnh bằng nhau.', 'The diagonals of a square are equal, perpendicular, and bisect each other at $45^\\circ$ to the sides.', 'Hai đường chéo hình vuông bằng nhau, vuông góc, cắt nhau tại trung điểm và tạo góc $45^\\circ$ với cạnh.'),
      ],
      [
        n('g8l14-n1', '\\text{Square} = \\text{Rectangle} \\cap \\text{Rhombus}', 'a square is both a rectangle and a rhombus', 'hình vuông vừa là hình chữ nhật vừa là hình thoi'),
      ],
      [
        e('g8l14-e1', 'describe', 'Every square is simultaneously a rectangle, a rhombus, a parallelogram, and an isosceles trapezoid.', 'Mỗi hình vuông đồng thời là hình chữ nhật, hình thoi, hình bình hành và hình thang cân.'),
        e('g8l14-e2', 'question', 'If a rhombus has one right angle or equal diagonals, what shape does it become?', 'Hình thoi có thêm một góc vuông hoặc hai đường chéo bằng nhau sẽ trở thành hình gì?'),
        e('g8l14-e3', 'present', 'Because $ABCD$ is a rectangle with diagonal $AC$ bisecting $\\angle A$, it is a square.', 'Vì $ABCD$ là hình chữ nhật có đường chéo $AC$ là phân giác góc $A$ nên $ABCD$ là hình vuông.'),
      ],
      [
        ex(
          'g8l14-ex1',
          'Rhombus side length from its diagonals',
          'Tính cạnh hình thoi từ hai đường chéo',
          'Rhombus $ABCD$ has diagonals $AC = 12\\text{ cm}$ and $BD = 16\\text{ cm}$ meeting at $O$. Find side $AB$.',
          'Hình thoi $ABCD$ có hai đường chéo $AC = 12\\text{ cm}, BD = 16\\text{ cm}$ cắt nhau tại $O$. Tính cạnh $AB$.',
          [
            s('Step 1: Half-diagonals and right angle', 'Bước 1: Tính nửa đường chéo và góc vuông', '$AC \\perp BD$ at midpoint $O$, so $OA = 6\\text{ cm}, OB = 8\\text{ cm}$, $\\angle AOB = 90^\\circ$.', '$OA = 6\\text{ cm}, OB = 8\\text{ cm}$ và $\\widehat{AOB} = 90^\\circ$.'),
            s('Step 2: Apply Pythagorean theorem', 'Bước 2: Tính $AB$', '$AB = \\sqrt{6^2 + 8^2} = 10\\text{ cm}$.', '$AB = \\sqrt{6^2 + 8^2} = 10\\text{ cm}$.'),
          ],
          'Each side of the rhombus measures $10\\text{ cm}$.',
          'Cạnh hình thoi bằng $10\\text{ cm}$.'
        ),
      ],
      ['Số nhiều của `rhombus` trong toán học tiếng Anh có thể là `rhombi` hoặc `rhombuses`.']
    ),
  ]),
  chapter(8, 4, 'Triangle Proportionality Theorem', 'Định lí Thalès', [
    lesson(
      8, 4, 15,
      'Triangle Proportionality Theorem (Thalès\' Theorem)',
      'Định lí Thalès trong tam giác',
      ['Define proportional segments and state both the direct and converse Thalès\' theorems.', 'Calculate unknown lengths on parallel transversals across a triangle.'],
      ['Nêu định nghĩa đoạn thẳng tỉ lệ, định lí Thalès thuận, đảo và hệ quả.', 'Tính độ dài đoạn thẳng nhờ tỉ số song song trong tam giác.'],
      [
        v('g8l15-v1', 'proportional segments', 'n phr', 'đoạn thẳng tỉ lệ', 'Four segments $AB, CD$ and $A\'B\', C\'D\'$ satisfying $\\frac{AB}{CD} = \\frac{A\'B\'}{C\'D\'}$.', 'Hai đoạn $AB, CD$ tỉ lệ với $A\'B\', C\'D\'$ nếu $\\frac{AB}{CD} = \\frac{A\'B\'}{C\'D\'}$.', 'Set up proportional ratios carefully along corresponding sides.', 'Lập đúng cặp đoạn thẳng tương ứng khi viết tỉ lệ thức.'),
        v('g8l15-v2', 'Thalès\' theorem / Triangle Proportionality Theorem', 'n phr', 'định lí Thalès trong tam giác', 'A line parallel to one side of a triangle divides the other two sides proportionally.', 'Đường thẳng song song với một cạnh của tam giác cắt hai cạnh còn lại thì định ra trên hai cạnh đó các đoạn thẳng tương ứng tỉ lệ.', 'Note that US textbooks often call this the Triangle Proportionality Theorem.', 'Sách tiếng Anh Mỹ hay gọi là Triangle Proportionality Theorem thay vì tên Thalès.'),
      ],
      [
        n('g8l15-n1', 'MN \\parallel BC \\Rightarrow \\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}', 'if M N is parallel to B C, then A M over A B equals A N over A C equals M N over B C', 'hệ quả Thalès: MN song song BC suy ra AM trên AB bằng AN trên AC bằng MN trên BC'),
      ],
      [
        e('g8l15-e1', 'describe', 'The corollary of Thalès\' theorem lets you include the parallel segment $MN$ and the base $BC$ in the proportion $\\frac{AM}{AB} = \\frac{MN}{BC}$.', 'Hệ quả định lí Thalès cho phép lập tỉ số giữa hai cạnh song song $\\frac{MN}{BC}$ với $\\frac{AM}{AB}$ (lưu ý không nhầm thành $\\frac{AM}{MB}$!).'),
        e('g8l15-e2', 'question', 'How can we test if $DE \\parallel BC$ given $AD = 2, DB = 4, AE = 3, EC = 6$?', 'Kiểm tra $DE \\parallel BC$ thế nào khi biết $AD = 2, DB = 4, AE = 3, EC = 6$?'),
        e('g8l15-e3', 'present', 'Since $\\frac{AD}{DB} = \\frac{2}{4} = \\frac{1}{2}$ and $\\frac{AE}{EC} = \\frac{3}{6} = \\frac{1}{2}$, by the converse Thalès\' theorem $DE \\parallel BC$.', 'Vì $\\frac{AD}{DB} = \\frac{AE}{EC} = \\frac{1}{2}$ nên theo định lí Thalès đảo, $DE \\parallel BC$.'),
      ],
      [
        ex(
          'g8l15-ex1',
          'Applying Thalès\' corollary',
          'Tính độ dài nhờ hệ quả Thalès',
          'In $\\triangle ABC$, draw $DE \\parallel BC$ ($D \\in AB, E \\in AC$) with $AD = 4\\text{ cm}, AB = 10\\text{ cm}, BC = 15\\text{ cm}$. Find $DE$.',
          'Cho $\\triangle ABC$, vẽ $DE \\parallel BC$ ($D \\in AB, E \\in AC$) biết $AD = 4\\text{ cm}, AB = 10\\text{ cm}, BC = 15\\text{ cm}$. Tính $DE$.',
          [
            s('Step 1: Set up corollary ratio', 'Bước 1: Viết tỉ số theo hệ quả Thalès', 'Since $DE \\parallel BC$, $\\frac{DE}{BC} = \\frac{AD}{AB}$.', 'Vì $DE \\parallel BC$ nên $\\frac{DE}{BC} = \\frac{AD}{AB}$.'),
            s('Step 2: Solve for $DE$', 'Bước 2: Thay số tính $DE$', '$\\frac{DE}{15} = \\frac{4}{10} \\Rightarrow DE = \\frac{15 \\cdot 4}{10} = 6\\text{ cm}$.', '$\\frac{DE}{15} = \\frac{4}{10} \\Rightarrow DE = 6\\text{ cm}$.'),
          ],
          'Thus, $DE = 6\\text{ cm}$.',
          'Vậy $DE = 6\\text{ cm}$.'
        ),
      ],
      ['Điểm cần chú ý: sách Mỹ gọi là `Triangle Proportionality Theorem` (còn ở châu Âu & Việt Nam dùng `Thales\'s theorem` — lưu ý bên Anh/Mỹ `Thales\' theorem` lại thường chỉ góc nội tiếp chắn nửa đường tròn!).']
    ),
    lesson(
      8, 4, 16,
      'Midsegments of a Triangle',
      'Đường trung bình của tam giác',
      ['Define the midsegment joining midpoints of two sides of a triangle.', 'Apply the midsegment properties ($MN \\parallel BC$ and $MN = \\frac{1}{2}BC$).'],
      ['Nêu định nghĩa đường trung bình của tam giác.', 'Vận dụng tính chất đường trung bình song song và bằng nửa cạnh thứ ba.'],
      [
        v('g8l16-v1', 'midsegment of a triangle', 'n phr', 'đường trung bình của tam giác', 'A segment connecting the midpoints of two sides of a triangle.', 'Đoạn thẳng nối trung điểm hai cạnh của tam giác.', 'Every triangle has three midsegments.', 'Mỗi tam giác có ba đường trung bình.'),
      ],
      [
        n('g8l16-n1', 'MN \\parallel BC \\text{ and } MN = \\frac{1}{2}BC', 'midsegment M N is parallel to B C and half as long as B C', 'đường trung bình MN song song với BC và bằng nửa BC'),
      ],
      [
        e('g8l16-e1', 'describe', 'The midsegment of a triangle is parallel to the third side and equals half its length.', 'Đường trung bình của tam giác thì song song với cạnh thứ ba và bằng nửa cạnh ấy.'),
        e('g8l16-e2', 'question', 'If you connect the midpoints of all three sides of $\\triangle ABC$, what is the perimeter ratio?', 'Nối ba trung điểm ba cạnh của $\\triangle ABC$ tạo thành tam giác mới có chu vi bằng mấy phần chu vi $\\triangle ABC$?'),
        e('g8l16-e3', 'present', 'Passing through the midpoint of $AB$ and parallel to $BC$, line $MN$ bisects $AC$ as well.', 'Đi qua trung điểm một cạnh và song song với cạnh thứ hai thì đi qua trung điểm cạnh thứ ba.'),
      ],
      [
        ex(
          'g8l16-ex1',
          'Measuring indirect distance across a pond',
          'Đo khoảng cách gián tiếp bằng đường trung bình',
          'To measure pond width $BC$, mark $A$ on shore and midpoints $M, N$ of $AB, AC$. Given $MN = 42\\text{ m}$, find $BC$.',
          'Để đo chiều rộng $BC$ của cái ao, chọn điểm $A$ và lấy trung điểm $M, N$ của $AB, AC$. Biết $MN = 42\\text{ m}$, tính $BC$.',
          [
            s('Step 1: Identify midsegment', 'Bước 1: Nhận dạng đường trung bình', 'Since $M, N$ are midpoints of $AB, AC$, $MN$ is a midsegment of $\\triangle ABC$.', 'Vì $M, N$ là trung điểm $AB, AC$ nên $MN$ là đường trung bình $\\triangle ABC$.'),
            s('Step 2: Double $MN$', 'Bước 2: Tính $BC$', '$BC = 2 \\cdot MN = 2 \\cdot 42 = 84\\text{ m}$.', '$BC = 2 \\cdot MN = 84\\text{ m}$.'),
          ],
          'The pond width $BC$ is $84\\text{ m}$.',
          'Khoảng cách $BC$ là $84\\text{ m}$.'
        ),
      ],
      ['Trong hình thang cũng có `midsegment of a trapezoid` bằng nửa tổng hai đáy, học sinh rất thích liên hệ mở rộng thêm.']
    ),
    lesson(
      8, 4, 17,
      'Triangle-Angle-Bisector Theorem',
      'Tính chất đường phân giác của tam giác',
      ['State the Triangle-Angle-Bisector Theorem for both interior and exterior angle bisectors.', 'Compute divided opposite-side lengths using the adjacent-sides ratio.'],
      ['Phát biểu tính chất đường phân giác trong tam giác.', 'Tính độ dài đoạn thẳng trên cạnh đối diện dựa vào tỉ số hai cạnh kề.'],
      [
        v('g8l17-v1', 'angle bisector of a triangle', 'n phr', 'đường phân giác của tam giác', 'A segment from a vertex bisecting that angle and meeting the opposite side.', 'Đoạn thẳng chia đôi góc ở một đỉnh và cắt cạnh đối diện.', 'An angle bisector divides the opposite side into segments proportional to the other two sides.', 'Đường phân giác chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề.'),
      ],
      [
        n('g8l17-n1', '\\frac{DB}{DC} = \\frac{AB}{AC}', 'D B over D C equals A B over A C', 'DB trên DC bằng AB trên AC'),
      ],
      [
        e('g8l17-e1', 'describe', 'Make sure to match each segment on the base with its adjacent leg: $DB$ pairs with $AB$, and $DC$ pairs with $AC$.', 'Nhớ ghép đúng đoạn đáy với cạnh kề tương ứng: $DB$ đi với $AB$, $DC$ đi với $AC$.'),
        e('g8l17-e2', 'question', 'In $\\triangle ABC$ with bisector $AD$, if $AB = 6, AC = 9$, what is $\\frac{DB}{DC}$?', 'Trong $\\triangle ABC$ có phân giác $AD$, nếu $AB = 6, AC = 9$ thì $\\frac{DB}{DC}$ bằng bao nhiêu?'),
        e('g8l17-e3', 'present', 'By the angle-bisector theorem, $\\frac{DB}{DC} = \\frac{6}{9} = \\frac{2}{3}$.', 'Theo tính chất đường phân giác, $\\frac{DB}{DC} = \\frac{6}{9} = \\frac{2}{3}$.'),
      ],
      [
        ex(
          'g8l17-ex1',
          'Finding divided segments on the base',
          'Tính độ dài hai đoạn bị phân giác chia ra',
          'In $\\triangle ABC$, $AD$ is the angle bisector of $\\angle A$. Given $AB = 8\\text{ cm}, AC = 12\\text{ cm}, BC = 10\\text{ cm}$, find $DB$ and $DC$.',
          'Cho $\\triangle ABC$ có phân giác $AD$. Biết $AB = 8\\text{ cm}, AC = 12\\text{ cm}, BC = 10\\text{ cm}$, tính $DB$ và $DC$.',
          [
            s('Step 1: Set up ratio', 'Bước 1: Lập tỉ lệ thức', '$\\frac{DB}{DC} = \\frac{AB}{AC} = \\frac{8}{12} = \\frac{2}{3} \\Rightarrow \\frac{DB}{2} = \\frac{DC}{3}$.', '$\\frac{DB}{DC} = \\frac{8}{12} = \\frac{2}{3} \\Rightarrow \\frac{DB}{2} = \\frac{DC}{3}$.'),
            s('Step 2: Use $DB + DC = 10$', 'Bước 2: Áp dụng dãy tỉ số bằng nhau', '$\\frac{DB}{2} = \\frac{DC}{3} = \\frac{DB + DC}{5} = \\frac{10}{5} = 2 \\Rightarrow DB = 4\\text{ cm}, DC = 6\\text{ cm}$.', '$\\Rightarrow DB = 4\\text{ cm}, DC = 6\\text{ cm}$.'),
          ],
          '$DB = 4\\text{ cm}$ and $DC = 6\\text{ cm}$.',
          'Vậy $DB = 4\\text{ cm}$ và $DC = 6\\text{ cm}$.'
        ),
      ],
      ['Ghi nhớ quy tắc "cạnh kề nào thì đoạn đáy ấy" để không bao giờ viết ngược phân số $\\frac{DB}{DC} = \\frac{AC}{AB}$!']
    ),
  ]),
  chapter(8, 5, 'Data and Charts', 'Dữ liệu và biểu đồ', [
    lesson(
      8, 5, 18,
      'Collecting and Classifying Data',
      'Thu thập và phân loại dữ liệu',
      ['Distinguish continuous numerical data vs. discrete numerical data.', 'Select appropriate data collection methods (direct observation, experiment, survey, database).'],
      ['Phân biệt số liệu liên tục và số liệu rời rạc.', 'Lựa chọn phương pháp thu thập dữ liệu phù hợp.'],
      [
        v('g8l18-v1', 'discrete data / continuous data', 'n phr', 'số liệu rời rạc / số liệu liên tục', 'Countable whole-number data vs. measured data that can take any value in an interval.', 'Số liệu đếm được từng đơn vị (rời rạc) và số liệu đo đạc nhận mọi giá trị trong khoảng (liên tục).', 'Number of students is discrete; height and temperature are continuous.', 'Số học sinh là số liệu rời rạc; chiều cao và nhiệt độ là số liệu liên tục.'),
        v('g8l18-v2', 'direct / indirect collection', 'adj phr', 'thu thập trực tiếp / gián tiếp', 'Measuring/surveying firsthand vs. retrieving from published statistics or websites.', 'Tự quan sát, đo đạc, phát phiếu hỏi so với tra cứu từ nguồn có sẵn.', 'Weather records from an official meteorological website are indirect data.', 'Số liệu thời tiết lấy từ trang khí tượng là thu thập gián tiếp.'),
      ],
      [
        n('g8l18-n1', '\\text{Discrete (Count)} \\text{ vs. } \\text{Continuous (Measure)}', 'discrete data comes from counting, while continuous data comes from measuring', 'dữ liệu rời rạc thu từ phép đếm, dữ liệu liên tục thu từ phép đo'),
      ],
      [
        e('g8l18-e1', 'describe', 'Continuous data typically arises from measurements such as weight, length, time, or temperature.', 'Số liệu liên tục thường thu được qua phép đo cân nặng, độ dài, thời gian, nhiệt độ.'),
        e('g8l18-e2', 'question', 'Which type of data is "number of bicycles in each household": discrete or continuous?', '"Số xe đạp trong mỗi hộ gia đình" là số liệu rời rạc hay liên tục?'),
        e('g8l18-e3', 'present', 'Since bicycle counts only take whole numbers $0, 1, 2, \\dots$, it is discrete data.', 'Vì chỉ nhận các giá trị nguyên $0; 1; 2; \\dots$ nên đó là số liệu rời rạc.'),
      ],
      [
        ex(
          'g8l18-ex1',
          'Classifying four types of data',
          'Phân loại dữ liệu thống kê',
          'Classify: (a) Blood types A, B, AB, O; (b) Students absent per day; (c) Running times in a $100\\text{ m}$ race.',
          'Phân loại: (a) Nhóm máu A, B, AB, O; (b) Số học sinh vắng mỗi ngày; (c) Thời gian chạy $100\\text{ m}$.',
          [
            s('Step 1: Categorical vs. Numerical', 'Bước 1: Xét không phải số vs số liệu', '(a) is categorical (non-numerical); (b) and (c) are numerical.', '(a) dữ liệu không phải số; (b) và (c) là số liệu.'),
            s('Step 2: Discrete vs. Continuous', 'Bước 2: Phân biệt rời rạc và liên tục', '(b) comes from counting (discrete); (c) comes from measuring time (continuous).', '(b) số liệu rời rạc; (c) số liệu liên tục.'),
          ],
          '(a) categorical; (b) discrete numerical; (c) continuous numerical.',
          '(a) không phải số; (b) số liệu rời rạc; (c) số liệu liên tục.'
        ),
      ],
      ['Khẩu quyết đơn giản cho học sinh: `Count = Discrete; Measure = Continuous`.']
    ),
    lesson(
      8, 5, 19,
      'Representing Data with Charts and Graphs',
      'Biểu diễn dữ liệu bằng bảng, biểu đồ',
      ['Select the right chart type (bar, double bar, pie, line) based on what feature we want to highlight.', 'Convert data flexibly between tables, bar charts, and pie charts.'],
      ['Lựa chọn đúng loại biểu đồ (cột, cột kép, quạt tròn, đoạn thẳng) tùy mục đích biểu diễn.', 'Chuyển đổi qua lại giữa bảng thống kê và các loại biểu đồ.'],
      [
        v('g8l19-v1', 'chart selection', 'n phr', 'lựa chọn biểu đồ', 'Pie chart for parts of a whole; line graph for trend over time; bar/double bar for comparing counts.', 'Quạt tròn cho tỉ trọng $100\\%$; đoạn thẳng cho xu hướng theo thời gian; cột/cột kép để so sánh số lượng.', 'Use a line graph to track monthly rainfall throughout the year.', 'Dùng biểu đồ đoạn thẳng để theo dõi lượng mưa theo các tháng trong năm.'),
      ],
      [
        n('g8l19-n1', '\\text{Trend} \\to \\text{Line}; \\; \\text{Proportion} \\to \\text{Pie}; \\; \\text{Comparison} \\to \\text{Bar}', 'line graph for trends, pie chart for shares, bar chart for comparisons', 'đoạn thẳng cho xu hướng, quạt tròn cho cơ cấu tỉ lệ, cột cho so sánh'),
      ],
      [
        e('g8l19-e1', 'describe', 'Pie charts emphasize percentage composition out of $100\\%$, not exact time trends.', 'Biểu đồ hình quạt tròn nhấn mạnh cơ cấu phần trăm trong tổng $100\\%$, không dùng cho xu hướng thời gian.'),
        e('g8l19-e2', 'question', 'Which chart best compares boys\' and girls\' exam grades across Math, Literature, and English?', 'Biểu đồ nào thích hợp nhất để so sánh điểm của học sinh nam và nữ ở Toán, Văn, Anh?'),
        e('g8l19-e3', 'present', 'A double bar chart displays both groups side by side clearly for each subject.', 'Biểu đồ cột kép thể hiện trực quan hai nhóm cạnh nhau theo từng môn học.'),
      ],
      [
        ex(
          'g8l19-ex1',
          'Choosing and converting to a pie chart',
          'Chọn loại biểu đồ và chuyển đổi số liệu',
          'A household budget is Food $40\\%$, Housing $35\\%$, Other $25\\%$ out of $20$ million VND. Choose the best chart and find each amount.',
          'Chi tiêu gia đình gồm: Ăn uống $40\\%$, Nhà ở $35\\%$, Khác $25\\%$ trên tổng $20$ triệu đồng. Chọn biểu đồ phù hợp và tính số tiền từng mục.',
          [
            s('Step 1: Choose chart', 'Bước 1: Chọn loại biểu đồ', 'Since the categories express shares summing to $100\\%$ of one total, a pie chart fits best.', 'Vì biểu diễn cơ cấu tỉ lệ phần trăm của một tổng nên chọn biểu đồ hình quạt tròn.'),
            s('Step 2: Calculate amounts', 'Bước 2: Tính số tiền', 'Food: $8$ million; Housing: $7$ million; Other: $5$ million VND.', 'Ăn uống: $8$ triệu; Nhà ở: $7$ triệu; Khác: $5$ triệu đồng.'),
          ],
          'Use a pie chart with values $8, 7,$ and $5$ million VND.',
          'Dùng biểu đồ hình quạt tròn với giá trị $8; 7; 5$ triệu đồng.'
        ),
      ],
      ['Chú ý: biểu đồ đoạn thẳng KHÔNG phù hợp khi trục ngang là các đối tượng không có thứ tự thời gian/liên tục.']
    ),
    lesson(
      8, 5, 20,
      'Analyzing Statistical Data',
      'Phân tích số liệu thống kê dựa vào biểu đồ',
      ['Detect misleading visual tricks in charts (truncated vertical axis starting above $0$, distorted widths).', 'Draw accurate, non-exaggerated conclusions from statistical graphs.'],
      ['Phát hiện biểu đồ gây hiểu lầm (trục đứng không bắt đầu từ $0$, độ rộng cột không đều).', 'Đưa ra nhận xét, phân tích chính xác từ biểu đồ thống kê.'],
      [
        v('g8l20-v1', 'misleading chart / truncated axis', 'n phr', 'biểu đồ gây hiểu nhầm / trục cắt ngắn (không từ $0$)', 'A chart that exaggerates or hides differences by starting the vertical axis above $0$ or changing scales.', 'Biểu đồ làm sai lệch cảm nhận bằng cách đặt gốc trục đứng khác $0$ hoặc chia vạch không đều.', 'Even if Bar B looks twice as tall as Bar A visually, check the vertical scale numbers!', 'Dù cột B trông cao gấp đôi cột A trên hình, hãy kiểm tra số đo thực ở trục đứng!'),
      ],
      [
        n('g8l20-n1', '\\text{Truncated axis: } y_{\\min} > 0', 'a vertical axis that does not start at zero can visually distort ratios', 'trục đứng không bắt đầu từ gốc 0 làm sai lệch tỉ lệ trực quan'),
      ],
      [
        e('g8l20-e1', 'describe', 'Starting a bar chart\'s vertical axis at $50$ instead of $0$ makes a small $10\\%$ difference appear huge visually.', 'Đặt gốc trục đứng từ $50$ thay vì $0$ làm một chênh lệch nhỏ trông như tăng gấp nhiều lần.'),
        e('g8l20-e2', 'question', 'Look at the vertical axis—why is the difference between $2023$ and $2024$ visually exaggerated?', 'Nhìn vào trục đứng, vì sao mức chênh lệch giữa năm 2023 và 2024 bị phóng đại trực quan?'),
        e('g8l20-e3', 'present', 'Reading exact values ($92$ vs $95$) shows the true increase is only $3.3\\%$, despite the tall bar difference.', 'Đọc số liệu thật ($92$ và $95$) cho thấy thực tế chỉ tăng $3{,}3\\%$, dù hình vẽ chênh rất lớn.'),
      ],
      [
        ex(
          'g8l20-ex1',
          'Spotting a misleading vertical scale',
          'Phát hiện sai lệch tỉ lệ trên biểu đồ cột',
          'A bar chart starts its vertical axis at $80$. Bar A is at $82$ and Bar B is at $86$. A claim says "B is three times higher than A". Evaluate this claim.',
          'Biểu đồ cột có trục đứng bắt đầu từ $80$. Cột A giá trị $82$, cột B giá trị $86$. Có nhận xét "B cao gấp 3 lần A". Nhận xét này đúng hay sai?',
          [
            s('Step 1: Measure visual height vs. true values', 'Bước 1: So sánh chiều cao hình vẽ và giá trị thật', 'Visually above $80$, heights are $82-80=2$ and $86-80=6$ ($3$ times visually).', 'Phần nhô trên mốc $80$ là $2$ và $6$ (trông cao gấp $3$).'),
            s('Step 2: Compute true ratio', 'Bước 2: Tính tỉ số thật', 'Actual ratio is $\\frac{86}{82} \\approx 1.05$, only about $4.9\\%$ higher!', 'Thực tế $\\frac{86}{82} \\approx 1{,}05$, chỉ lớn hơn khoảng $4{,}9\\%$!'),
          ],
          'The claim is false due to a truncated vertical axis starting at $80$.',
          'Nhận xét sai do trục đứng không bắt đầu từ $0$ gây ảo giác thị giác.'
        ),
      ],
      ['Kĩ năng tư duy phản biện rất quan trọng trong CT 2018: luôn kiểm tra mốc `0` và khoảng chia đều của trục đứng.']
    ),
  ]),
];
