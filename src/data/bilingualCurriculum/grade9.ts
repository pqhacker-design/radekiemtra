import { chapter, e, ex, lesson, n, s, v } from './helpers';
import { CurriculumGrade } from './types';

export const GRADE_9_CURRICULUM: CurriculumGrade = {
  grade: 9,
  labelVi: 'Toán Khối 9',
  labelEn: 'Grade 9 Mathematics',
  sourceDocTitle: 'Tài liệu hướng dẫn triển khai dạy học cấp THCS bằng tiếng Anh – Môn Toán Khối 9 (Bộ GD&ĐT, Hà Nội 2026)',
  chapters: [
    chapter(9, 1, 'Linear Equations and Systems of Linear Equations in Two Variables', 'Phương trình và hệ hai phương trình bậc nhất hai ẩn', [
      lesson(
        9, 1, 1,
        'Linear Equations and Systems of Linear Equations in Two Variables',
        'Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn',
        ['Identify linear equations and systems of two linear equations in two variables.', 'Determine ordered-pair solutions and their geometric representation.'],
        ['Nhận biết phương trình và hệ hai phương trình bậc nhất hai ẩn.', 'Xác định nghiệm là cặp số sắp thứ tự và biểu diễn hình học của tập nghiệm.'],
        [
          v('g9l1-v1', 'linear equation in two variables', 'n phr', 'phương trình bậc nhất hai ẩn', 'An equation of the form $ax + by = c$ where $a$ and $b$ are not both zero.', 'Phương trình có dạng $ax + by = c$ với $a, b$ không đồng thời bằng $0$.', '$x + 3y = 2$ is a linear equation in two variables.', '$x + 3y = 2$ là một phương trình bậc nhất hai ẩn.'),
          v('g9l1-v2', 'ordered pair', 'n phr', 'cặp số sắp thứ tự', 'A pair $(x_0, y_0)$ written in specific order representing a candidate solution.', 'Cặp số $(x_0; y_0)$ theo thứ tự $(x, y)$ biểu diễn một nghiệm tiềm năng.', 'The ordered pair $(2, 0)$ is a solution of $x + 3y = 2$.', 'Cặp số $(2; 0)$ là một nghiệm của phương trình $x + 3y = 2$.'),
          v('g9l1-v3', 'general solution', 'n phr', 'nghiệm tổng quát', 'A formula describing all infinitely many solutions of a linear equation in two variables.', 'Công thức biểu diễn toàn bộ vô số nghiệm của phương trình bậc nhất hai ẩn.', '$\\left(x, \\frac{2-x}{3}\\right)$ is the general solution of $x + 3y = 2$.', '$\\left(x; \\frac{2-x}{3}\\right)$ là nghiệm tổng quát của phương trình $x + 3y = 2$.'),
          v('g9l1-v4', 'intersect / parallel / coincide', 'v', 'cắt nhau / song song / trùng nhau', 'Three relative positions of two lines corresponding to 1, 0, or infinitely many solutions.', 'Ba vị trí tương đối của hai đường thẳng tương ứng với có 1 nghiệm, vô nghiệm hoặc vô số nghiệm.', 'If two lines intersect at one point, the system has a unique solution.', 'Nếu hai đường thẳng cắt nhau tại một điểm thì hệ có nghiệm duy nhất.'),
        ],
        [
          n('g9l1-n1', 'ax + by = c \\;(a^2 + b^2 \\ne 0)', 'a x plus b y equals c, where a and b are not both zero', 'a x cộng b y bằng c, với a và b không đồng thời bằng 0'),
          n('g9l1-n2', '\\begin{cases} x + y = 2 \\\\ x + 3y = 2 \\end{cases}', 'the system of equations: x plus y equals two, and x plus three y equals two', 'hệ phương trình gồm x cộng y bằng 2 và x cộng 3y bằng 2'),
        ],
        [
          e('g9l1-e1', 'describe', 'Every linear equation in two variables has infinitely many solutions, geometrically represented by a line.', 'Mỗi phương trình bậc nhất hai ẩn có vô số nghiệm, biểu diễn hình học là một đường thẳng.'),
          e('g9l1-e2', 'question', 'Check if the ordered pair is a solution of the system of equations.', 'Kiểm tra xem cặp số đã cho có phải là nghiệm của hệ phương trình hay không.'),
          e('g9l1-e3', 'present', 'Rewriting the equation as $y = 2x - 1$, its general solution is $(x, 2x - 1)$ for $x \\in \\mathbb{R}$.', 'Viết lại phương trình thành $y = 2x - 1$, ta có nghiệm tổng quát là $(x; 2x - 1)$ với $x \\in \\mathbb{R}$.'),
        ],
        [
          ex(
            'g9l1-ex1',
            'General solution and geometric line',
            'Nghiệm tổng quát và biểu diễn đường thẳng',
            'Write the general solution of $2x - y = 1$ and graph it on the coordinate plane.',
            'Viết nghiệm tổng quát của phương trình $2x - y = 1$ và biểu diễn trên mặt phẳng tọa độ.',
            [
              s('Step 1: Express $y$ in terms of $x$', 'Bước 1: Biểu diễn $y$ theo $x$', 'We rewrite $2x - y = 1$ as $y = 2x - 1$.', 'Ta biến đổi phương trình thành $y = 2x - 1$.'),
              s('Step 2: State the general solution', 'Bước 2: Viết nghiệm tổng quát', 'The general solution is $(x, 2x - 1)$ for $x \\in \\mathbb{R}$.', 'Nghiệm tổng quát là $(x; 2x - 1)$ với $x \\in \\mathbb{R}$.'),
              s('Step 3: Plot two points', 'Bước 3: Lấy hai điểm thuộc đường thẳng', 'Choose $A(0, -1)$ and $B(1, 1)$ and draw the line passing through them.', 'Chọn hai điểm $A(0; -1)$ và $B(1; 1)$ rồi vẽ đường thẳng đi qua hai điểm đó.'),
            ],
            'Every point on the line $d: y = 2x - 1$ corresponds to a solution of the equation.',
            'Mỗi điểm thuộc đường thẳng $d: y = 2x - 1$ là một nghiệm của phương trình.'
          ),
        ],
        ['Tiếng Việt viết tọa độ dùng dấu chấm phẩy $A(0; -1)$, tiếng Anh dùng dấu phẩy $A(0, -1)$.']
      ),
      lesson(
        9, 1, 2,
        'Solving Systems of Linear Equations in Two Variables',
        'Giải hệ hai phương trình bậc nhất hai ẩn',
        ['Apply the substitution method and elimination method step by step.', 'Classify systems with unique solution, no solution, or infinitely many solutions.'],
        ['Áp dụng thành thạo phương pháp thế và phương pháp cộng đại số.', 'Phân biệt hệ có nghiệm duy nhất, vô nghiệm và vô số nghiệm.'],
        [
          v('g9l2-v1', 'substitution method', 'n phr', 'phương pháp thế', 'Expressing one variable in terms of the other from one equation and substituting it into the second.', 'Biểu diễn một ẩn theo ẩn kia từ một phương trình rồi thế vào phương trình còn lại.', 'To solve by the substitution method, express $y$ in terms of $x$.', 'Để giải bằng phương pháp thế, ta biểu diễn $y$ theo $x$.'),
          v('g9l2-v2', 'elimination method', 'n phr', 'phương pháp cộng đại số', 'Multiplying equations if needed and adding or subtracting them to eliminate one variable.', 'Nhân hai vế nếu cần rồi cộng hoặc trừ từng vế hai phương trình để khử một ẩn.', 'Subtract the two equations to eliminate $x$.', 'Trừ hai phương trình cho nhau để khử ẩn $x$.'),
          v('g9l2-v3', 'unique solution', 'n phr', 'nghiệm duy nhất', 'Exactly one ordered pair satisfies both equations simultaneously.', 'Chỉ có đúng một cặp số thỏa mãn đồng thời cả hai phương trình.', 'Hence, the system has a unique solution $(x, y) = (3, 1)$.', 'Do đó hệ phương trình có nghiệm duy nhất $(x; y) = (3; 1)$.'),
          v('g9l2-v4', 'express ... in terms of ...', 'v phr', 'biểu diễn ... theo ...', 'Writing one unknown as an algebraic formula containing the other unknown.', 'Viết một ẩn dưới dạng biểu thức chứa ẩn kia.', 'From equation (1), express $x$ in terms of $y$.', 'Từ phương trình (1), biểu diễn $x$ theo $y$.'),
        ],
        [
          n('g9l2-n1', '(x, y) = (3, 1)', 'the ordered pair x, y equals three, one', 'nghiệm của hệ là cặp số x bằng 3, y bằng 1'),
        ],
        [
          e('g9l2-e1', 'describe', 'In the substitution method, always wrap the substituted expression in parentheses.', 'Khi thế biểu thức vào phương trình còn lại, cần đặt biểu thức trong dấu ngoặc đơn.'),
          e('g9l2-e2', 'question', 'Which variable should we eliminate, and what should we multiply each equation by?', 'Nên khử ẩn nào trước và cần nhân mỗi phương trình với số nào?'),
          e('g9l2-e3', 'present', 'Multiplying both sides of the first equation by $3$ and subtracting, we eliminate $x$.', 'Nhân cả hai vế của phương trình thứ nhất với $3$ rồi trừ từng vế để khử ẩn $x$.'),
        ],
        [
          ex(
            'g9l2-ex1',
            'Solving by substitution and elimination',
            'Giải hệ bằng phương pháp thế và cộng đại số',
            'Solve the system $\\begin{cases} x - y = 2 \\\\ 2x + 3y = 9 \\end{cases}$ using the substitution method.',
            'Giải hệ phương trình $\\begin{cases} x - y = 2 \\\\ 2x + 3y = 9 \\end{cases}$ bằng phương pháp thế.',
            [
              s('Step 1: Express one variable', 'Bước 1: Biểu diễn một ẩn theo ẩn kia', 'From the first equation, $x = y + 2$.', 'Từ phương trình thứ nhất, suy ra $x = y + 2$.'),
              s('Step 2: Substitute and solve', 'Bước 2: Thế và giải phương trình một ẩn', 'Substitute into the second equation: $2(y + 2) + 3y = 9 \\Rightarrow 5y = 5 \\Rightarrow y = 1$.', 'Thế vào phương trình thứ hai: $2(y + 2) + 3y = 9 \\Rightarrow 5y = 5 \\Rightarrow y = 1$.'),
              s('Step 3: Back-substitute', 'Bước 3: Tìm ẩn còn lại', 'Substitute $y = 1$ back into $x = y + 2$ to get $x = 3$.', 'Thay $y = 1$ vào $x = y + 2$ ta được $x = 3$.'),
            ],
            'The system has a unique solution $(x, y) = (3, 1)$.',
            'Hệ phương trình có nghiệm duy nhất $(x; y) = (3; 1)$.'
          ),
        ],
        ['Thuật ngữ "elimination method" dịch chuẩn là "phương pháp cộng đại số" (trong SGK tiếng Anh dùng nghĩa "khử ẩn").']
      ),
      lesson(
        9, 1, 3,
        'Solving Word Problems Using Systems of Equations',
        'Giải bài toán bằng cách lập hệ phương trình',
        ['Choose suitable variables and state domain conditions.', 'Formulate and solve a system of two linear equations from real-world contexts.'],
        ['Chọn hai ẩn thích hợp và đặt điều kiện cho ẩn.', 'Lập hệ phương trình biểu thị mối quan hệ và kiểm tra điều kiện nghiệm.'],
        [
          v('g9l3-v1', 'unknown / variable', 'n', 'ẩn số / biến số', 'A letter standing for an unknown quantity to be found.', 'Chữ cái đại diện cho đại lượng chưa biết cần tìm.', 'Let $x$ and $y$ be the time taken by each person alone.', 'Gọi $x$ và $y$ lần lượt là thời gian mỗi người làm một mình xong công việc.'),
          v('g9l3-v2', 'condition', 'n', 'điều kiện', 'Constraints such as positivity or integer values that solutions must satisfy.', 'Ràng buộc về dấu dương hoặc số nguyên mà nghiệm phải thỏa mãn.', 'Conditions: $x, y > 16$.', 'Điều kiện: $x, y > 16$.'),
          v('g9l3-v3', 'exceeded by 10%', 'v phr', 'vượt mức 10%', 'Producing $10\\%$ more than planned, giving factor $1.10$.', 'Làm vượt kế hoạch $10\\%$, tương ứng với hệ số $1{,}1$.', 'Factory I exceeded its plan by $10\\%$.', 'Phân xưởng I làm vượt mức kế hoạch $10\\%$.'),
        ],
        [
          n('g9l3-n1', '\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{16}', 'one over x plus one over y equals one over sixteen', 'một phần x cộng một phần y bằng một phần mười sáu'),
        ],
        [
          e('g9l3-e1', 'describe', 'In work-rate problems, if a worker finishes the job in $x$ hours, their hourly rate is $\\frac{1}{x}$ of the job.', 'Trong bài toán năng suất, nếu làm một mình mất $x$ giờ thì mỗi giờ làm được $\\frac{1}{x}$ công việc.'),
          e('g9l3-e2', 'question', 'Do the found values of $x$ and $y$ satisfy the conditions?', 'Các giá trị $x$ và $y$ tìm được có thỏa mãn điều kiện đặt ra không?'),
          e('g9l3-e3', 'present', 'Setting $u = \\frac{1}{x}$ and $v = \\frac{1}{y}$ reduces the system to a linear system.', 'Đặt ẩn phụ $u = \\frac{1}{x}$ và $v = \\frac{1}{y}$ để đưa về hệ bậc nhất.'),
        ],
        [
          ex(
            'g9l3-ex1',
            'Joint work problem',
            'Bài toán làm chung công việc',
            'Two people working together finish a job in $16$ hours. If the first works $15$ hours and the second works $6$ hours, they finish $\\frac{3}{4}$ of the job. Find each person’s time alone.',
            'Hai người cùng làm chung công việc trong $16$ giờ thì xong. Nếu người thứ nhất làm $15$ giờ và người thứ hai làm $6$ giờ thì được $\\frac{3}{4}$ công việc. Tính thời gian mỗi người làm một mình.',
            [
              s('Step 1: Define variables', 'Bước 1: Chọn ẩn và điều kiện', 'Let $x, y$ (hours) be the time each person takes alone ($x, y > 16$).', 'Gọi $x, y$ (giờ) lần lượt là thời gian mỗi người làm một mình xong việc ($x, y > 16$).'),
              s('Step 2: Set up the system', 'Bước 2: Lập hệ phương trình', 'We have $\\begin{cases} \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{16} \\\\ \\frac{15}{x} + \\frac{6}{y} = \\frac{3}{4} \\end{cases}$.', 'Ta lập được hệ phương trình $\\begin{cases} \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{16} \\\\ \\frac{15}{x} + \\frac{6}{y} = \\frac{3}{4} \\end{cases}$.'),
              s('Step 3: Solve by auxiliary variables', 'Bước 3: Đặt ẩn phụ và giải', 'Let $u = \\frac{1}{x}, v = \\frac{1}{y}$. Solving gives $u = \\frac{1}{24}, v = \\frac{1}{48}$, so $x = 24, y = 48$.', 'Đặt $u = \\frac{1}{x}, v = \\frac{1}{y}$, giải ra $u = \\frac{1}{24}, v = \\frac{1}{48} \\Rightarrow x = 24, y = 48$ (thỏa mãn).'),
            ],
            'It takes $24$ hours for the first person and $48$ hours for the second person.',
            'Người thứ nhất làm một mình mất $24$ giờ, người thứ hai mất $48$ giờ.'
          ),
        ],
        ['Chú ý mẫu câu "Let x and y represent ..., respectively" nghĩa là "lần lượt là".']
      ),
    ]),
    chapter(9, 2, 'Linear Equations and Linear Inequalities in One Variable', 'Phương trình và bất phương trình bậc nhất một ẩn', [
      lesson(
        9, 2, 4,
        'Equations Reducible to Linear Equations in One Variable',
        'Phương trình quy về phương trình bậc nhất một ẩn',
        ['Solve product equations $(ax + b)(cx + d) = 0$.', 'Find domain restrictions and solve rational equations with unknowns in the denominator.'],
        ['Giải phương trình tích $(ax + b)(cx + d) = 0$.', 'Tìm điều kiện xác định và giải phương trình chứa ẩn ở mẫu.'],
        [
          v('g9l4-v1', 'product equation', 'n phr', 'phương trình tích', 'An equation written as a product of factors equal to zero.', 'Phương trình có dạng tích các biểu thức bằng $0$.', '$(x + 1)(x - 1) = 0$ is a product equation.', '$(x + 1)(x - 1) = 0$ là một phương trình tích.'),
          v('g9l4-v2', 'Zero-Product Property', 'n phr', 'Tính chất tích bằng 0', 'If $A \\cdot B = 0$, then either $A = 0$ or $B = 0$.', 'Nếu $A \\cdot B = 0$ thì $A = 0$ hoặc $B = 0$.', 'By the Zero-Product Property, either $x - 2 = 0$ or $x + 1 = 0$.', 'Áp dụng tính chất tích bằng $0$, ta có $x - 2 = 0$ hoặc $x + 1 = 0$.'),
          v('g9l4-v3', 'restriction / domain condition', 'n', 'điều kiện xác định', 'Values excluded so no denominator becomes zero.', 'Điều kiện để các mẫu thức khác $0$.', 'The restrictions of $\\frac{3}{x+2} + \\frac{1}{x-1}$ are $x \\ne -2$ and $x \\ne 1$.', 'Điều kiện xác định là $x \\ne -2$ và $x \\ne 1$.'),
          v('g9l4-v4', 'common denominator', 'n phr', 'mẫu thức chung', 'A shared multiple of all denominators in the equation.', 'Bội chung của tất cả các mẫu thức trong phương trình.', 'Multiply both sides by the common denominator $(x + 2)(x - 1)$.', 'Nhân cả hai vế với mẫu thức chung $(x + 2)(x - 1)$.'),
        ],
        [
          n('g9l4-n1', 'x \\ne -2,\\; x \\ne 1', 'x is not equal to minus two and x is not equal to one', 'x khác âm 2 và x khác 1'),
        ],
        [
          e('g9l4-e1', 'describe', 'Always check whether the candidate root satisfies all domain restrictions.', 'Luôn đối chiếu nghiệm tìm được với điều kiện xác định của phương trình.'),
          e('g9l4-e2', 'question', 'Does $x = 1$ satisfy the restrictions?', 'Giá trị $x = 1$ có thỏa mãn điều kiện xác định không?'),
          e('g9l4-e3', 'present', 'Since $x = 1$ violates the restriction $x \\ne 1$, the equation has no solution.', 'Vì $x = 1$ không thỏa mãn điều kiện xác định $x \\ne 1$ nên phương trình vô nghiệm.'),
        ],
        [
          ex(
            'g9l4-ex1',
            'Rational equation with extraneous root',
            'Phương trình chứa ẩn ở mẫu có nghiệm ngoại lai',
            'Solve the equation $\\frac{3}{x+2} + \\frac{1}{x-1} = \\frac{3}{x^2 + x - 2}$.',
            'Giải phương trình $\\frac{3}{x+2} + \\frac{1}{x-1} = \\frac{3}{x^2 + x - 2}$.',
            [
              s('Step 1: State restrictions', 'Bước 1: Tìm điều kiện xác định', 'Factor $x^2 + x - 2 = (x + 2)(x - 1)$. Restrictions: $x \\ne -2, x \\ne 1$.', 'Phân tích $x^2 + x - 2 = (x + 2)(x - 1)$. Điều kiện xác định: $x \\ne -2$ và $x \\ne 1$.'),
              s('Step 2: Clear denominators', 'Bước 2: Quy đồng và khử mẫu', 'Multiply by $(x + 2)(x - 1)$: $3(x - 1) + (x + 2) = 3 \\Rightarrow 4x - 1 = 3 \\Rightarrow x = 1$.', 'Khử mẫu được $3(x - 1) + (x + 2) = 3 \\Rightarrow 4x - 1 = 3 \\Rightarrow x = 1$.'),
              s('Step 3: Check restrictions', 'Bước 3: Đối chiếu điều kiện', 'The value $x = 1$ does not satisfy $x \\ne 1$, so it is rejected.', 'Giá trị $x = 1$ không thỏa mãn điều kiện $x \\ne 1$ nên bị loại.'),
            ],
            'Hence, the equation has no solution.',
            'Vậy phương trình đã cho vô nghiệm.'
          ),
        ],
        ['Đừng quên bước "The value x = 1 does not satisfy the restrictions" trước khi kết luận "has no solution".']
      ),
      lesson(
        9, 2, 5,
        'Inequalities and Their Properties',
        'Bất đẳng thức và tính chất',
        ['Read inequality signs ($<, \\le, >, \\ge$) fluently in English.', 'Prove inequalities using addition, multiplication, and transitive properties.'],
        ['Đọc thành thạo các dấu bất đẳng thức bằng tiếng Anh.', 'Chứng minh bất đẳng thức bằng tính chất liên hệ với phép cộng, phép nhân và bắc cầu.'],
        [
          v('g9l5-v1', 'inequality', 'n', 'bất đẳng thức', 'A mathematical statement comparing two expressions with $<, \\le, >, \\ge$.', 'Hệ thức so sánh hai biểu thức bằng các dấu $<, \\le, >, \\ge$.', '$a < b$ is an inequality with left-hand side $a$.', '$a < b$ là một bất đẳng thức với vế trái là $a$.'),
          v('g9l5-v2', 'transitive property', 'n phr', 'tính chất bắc cầu', 'If $a < b$ and $b < c$, then $a < c$.', 'Nếu $a < b$ và $b < c$ thì $a < c$.', 'By the transitive property, $a < c$.', 'Theo tính chất bắc cầu, suy ra $a < c$.'),
          v('g9l5-v3', 'reverse the inequality sign', 'v phr', 'đổi chiều bất đẳng thức', 'Multiplying or dividing both sides by a negative number reverses $< $ to $>$.', 'Nhân hoặc chia hai vế với số âm thì phải đổi chiều dấu bất đẳng thức.', 'Multiplying by $-2$, we reverse the inequality sign.', 'Khi nhân với $-2$, ta đổi chiều dấu bất đẳng thức.'),
          v('g9l5-v4', 'at least / at most', 'adv phr', 'ít nhất ($\ge$) / nhiều nhất ($\le$)', 'English phrases translating $\\ge$ and $\\le$ in real-life constraints.', 'Cụm từ diễn đạt dấu $\\ge$ và $\\le$ trong bài toán thực tế.', 'The payload $m$ is at most $800\\text{ kg}$ ($m \\le 800$).', 'Tải trọng $m$ tối đa $800\\text{ kg}$ ($m \\le 800$).'),
        ],
        [
          n('g9l5-n1', 'a < b \\; / \\; a \\le b', 'a is strictly less than b / a is less than or equal to b', 'a nhỏ hơn hẳn b / a nhỏ hơn hoặc bằng b'),
          n('g9l5-n2', 'a > b \\; / \\; a \\ge b', 'a is strictly greater than b / a is greater than or equal to b', 'a lớn hơn hẳn b / a lớn hơn hoặc bằng b'),
        ],
        [
          e('g9l5-e1', 'describe', 'When multiplying both sides of an inequality by a negative number, reverse the inequality sign.', 'Khi nhân hai vế của bất đẳng thức với một số âm, phải đổi chiều bất đẳng thức.'),
          e('g9l5-e2', 'question', 'Consider the difference between the left-hand side and the right-hand side.', 'Xét hiệu giữa vế trái và vế phải.'),
          e('g9l5-e3', 'present', 'Since $LHS - RHS = (a - b)^2 \\ge 0$, we conclude $a^2 + b^2 \\ge 2ab$.', 'Vì $VT - VP = (a - b)^2 \\ge 0$ nên $a^2 + b^2 \\ge 2ab$.'),
        ],
        [
          ex(
            'g9l5-ex1',
            'Proving algebraic inequality via difference',
            'Chứng minh bất đẳng thức bằng xét hiệu',
            'Prove that for any real numbers $a$ and $b$: $a^2 + b^2 \\ge 2ab$.',
            'Chứng minh rằng với mọi số thực $a, b$: $a^2 + b^2 \\ge 2ab$.',
            [
              s('Step 1: Consider LHS - RHS', 'Bước 1: Xét hiệu vế trái trừ vế phải', '$LHS - RHS = a^2 + b^2 - 2ab$.', 'Ta xét $VT - VP = a^2 + b^2 - 2ab$.'),
              s('Step 2: Apply identity', 'Bước 2: Áp dụng hằng đẳng thức', '$a^2 + b^2 - 2ab = (a - b)^2$.', 'Ta có $a^2 + b^2 - 2ab = (a - b)^2$.'),
              s('Step 3: Conclude sign', 'Bước 3: Đánh giá dấu', 'Since $(a - b)^2 \\ge 0$ for all real $a, b$, we have $a^2 + b^2 \\ge 2ab$.', 'Vì $(a - b)^2 \\ge 0$ với mọi $a, b$ nên $a^2 + b^2 \\ge 2ab$.'),
            ],
            'Equality holds when $a = b$.',
            'Dấu bằng xảy ra khi $a = b$.'
          ),
        ],
        ['Chú ý phân biệt "bất đẳng thức" (inequality – mệnh đề so sánh) và "bất phương trình" (inequality – chứa ẩn cần giải).']
      ),
      lesson(
        9, 2, 6,
        'Linear Inequalities in One Variable',
        'Bất phương trình bậc nhất một ẩn',
        ['Identify linear inequalities in one variable $ax + b < 0$.', 'Solve linear inequalities and apply them to word problems.'],
        ['Nhận biết bất phương trình bậc nhất một ẩn.', 'Giải bất phương trình bậc nhất một ẩn và vận dụng vào bài toán thực tế.'],
        [
          v('g9l6-v1', 'linear inequality in one variable', 'n phr', 'bất phương trình bậc nhất một ẩn', 'An inequality of the form $ax + b < 0$ (or $>, \\le, \\ge$) with $a \\ne 0$.', 'Bất phương trình dạng $ax + b < 0$ (hoặc $>, \\le, \\ge$) với $a \\ne 0$.', '$3x - 1 < 0$ is a linear inequality in one variable.', '$3x - 1 < 0$ là một bất phương trình bậc nhất một ẩn.'),
          v('g9l6-v2', 'verify a solution', 'v phr', 'kiểm tra nghiệm', 'Substitute a number into the inequality to check if a true statement results.', 'Thay giá trị vào bất phương trình xem có được khẳng định đúng không.', '$x = 0$ is a solution of $3x - 6 < 0$ because $-6 < 0$ is true.', '$x = 0$ là nghiệm của $3x - 6 < 0$ vì $-6 < 0$ đúng.'),
        ],
        [
          n('g9l6-n1', 'x \\le \\frac{9}{4}', 'x is less than or equal to nine quarters (or nine over four)', 'x nhỏ hơn hoặc bằng chín phần tư'),
        ],
        [
          e('g9l6-e1', 'describe', 'The coefficient $a$ of $x$ must be non-zero for $ax + b < 0$ to be a linear inequality.', 'Hệ số $a$ của $x$ phải khác $0$ thì $ax + b < 0$ mới là bất phương trình bậc nhất một ẩn.'),
          e('g9l6-e2', 'question', 'Does dividing by $-2$ keep or reverse the inequality sign?', 'Khi chia cho $-2$ thì dấu bất đẳng thức giữ nguyên hay đổi chiều?'),
          e('g9l6-e3', 'present', 'Dividing both sides by $4 > 0$, we obtain $x \\le \\frac{9}{4}$.', 'Chia cả hai vế cho $4 > 0$, ta được $x \\le \\frac{9}{4}$.'),
        ],
        [
          ex(
            'g9l6-ex1',
            'Budget constraint problem',
            'Bài toán giới hạn chi tiêu',
            'Emma has $\\$60$ to spend. She buys a notebook for $\\$18$ and $3$ pens costing $x$ dollars each. Find the maximum possible price of each pen.',
            'Emma có $60$ đô la. Bạn mua một quyển vở giá $18$ đô la và $3$ chiếc bút giá $x$ đô la mỗi chiếc. Tìm giá tối đa của mỗi chiếc bút.',
            [
              s('Step 1: Write total cost', 'Bước 1: Biểu diễn tổng chi phí', 'Total cost is $3x + 18$ dollars.', 'Tổng số tiền phải trả là $3x + 18$ đô la.'),
              s('Step 2: Set up inequality', 'Bước 2: Lập bất phương trình', 'Since Emma has at most $\\$60$, $3x + 18 \\le 60$.', 'Vì chỉ có tối đa $60$ đô la nên $3x + 18 \\le 60$.'),
              s('Step 3: Solve', 'Bước 3: Giải bất phương trình', '$3x \\le 42 \\Rightarrow x \\le 14$.', 'Giải ra $3x \\le 42 \\Rightarrow x \\le 14$.'),
            ],
            'Each pen can cost at most $\\$14$.',
            'Mỗi chiếc bút có giá nhiều nhất là $14$ đô la.'
          ),
        ],
        ['Chú ý mẫu $0x - 4 < 0$ không phải bất phương trình bậc nhất một ẩn vì $a = 0$.']
      ),
    ]),
    chapter(9, 3, 'Square Roots and Cube Roots', 'Căn bậc hai và căn bậc ba', [
      lesson(
        9, 3, 7,
        'Square Roots and Square Root Expressions',
        'Căn bậc hai và căn thức bậc hai',
        ['Distinguish "a square root" from "the principal square root".', 'State the condition $A \\ge 0$ for $\\sqrt{A}$ to be defined and apply $\\sqrt{A^2} = |A|$.'],
        ['Phân biệt căn bậc hai với căn bậc hai số học.', 'Nêu điều kiện $A \\ge 0$ để $\\sqrt{A}$ xác định và vận dụng hằng đẳng thức $\\sqrt{A^2} = |A|$.'],
        [
          v('g9l7-v1', 'principal square root', 'n phr', 'căn bậc hai số học', 'The non-negative square root of a non-negative number $a$, denoted $\\sqrt{a}$.', 'Căn bậc hai không âm của số $a \\ge 0$, ký hiệu $\\sqrt{a}$.', 'The principal square root of $81$ is $9$, written $\\sqrt{81} = 9$.', 'Căn bậc hai số học của $81$ là $9$, viết là $\\sqrt{81} = 9$.'),
          v('g9l7-v2', 'radicand', 'n', 'biểu thức dưới dấu căn / biểu thức lấy căn', 'The expression written inside the radical symbol $\\sqrt{\\;\\;}$.', 'Biểu thức nằm bên dưới dấu căn bậc hai.', 'The radicand of $\\sqrt{5 - 2x}$ is $5 - 2x$.', 'Biểu thức dưới dấu căn của $\\sqrt{5 - 2x}$ là $5 - 2x$.'),
          v('g9l7-v3', 'to be defined', 'v phr', 'xác định / có nghĩa', 'Having a real value; $\\sqrt{A}$ is defined when $A \\ge 0$.', 'Có giá trị thực; $\\sqrt{A}$ xác định khi $A \\ge 0$.', '$\\sqrt{2x + 1}$ is defined when $2x + 1 \\ge 0$.', 'Căn thức $\\sqrt{2x + 1}$ xác định khi $2x + 1 \\ge 0$.'),
          v('g9l7-v4', 'absolute value', 'n phr', 'giá trị tuyệt đối', 'The non-negative magnitude $|A|$, used in $\\sqrt{A^2} = |A|$.', 'Giá trị không âm $|A|$, dùng trong $\\sqrt{A^2} = |A|$.', 'Applying $\\sqrt{A^2} = |A|$, we get $\\sqrt{(1-x)^2} = |1-x|$.', 'Áp dụng $\\sqrt{A^2} = |A|$, ta được $\\sqrt{(1-x)^2} = |1-x|$.'),
        ],
        [
          n('g9l7-n1', '\\sqrt{a} \\; / \\; -\\sqrt{a}', 'the square root of a / minus the square root of a', 'căn bậc hai số học của a / âm căn bậc hai của a'),
          n('g9l7-n2', '\\sqrt{a^2} = |a|', 'the square root of a squared equals the absolute value of a', 'căn bậc hai của a bình phương bằng giá trị tuyệt đối của a'),
        ],
        [
          e('g9l7-e1', 'describe', 'A positive number has two square roots, which are opposite numbers.', 'Một số dương có hai căn bậc hai là hai số đối nhau.'),
          e('g9l7-e2', 'question', 'Why is $\\sqrt{a^2}$ equal to $|a|$ and not to $a$?', 'Vì sao $\\sqrt{a^2}$ bằng $|a|$ chứ không bằng $a$?'),
          e('g9l7-e3', 'present', 'Since $x > 2$, we have $1 - x < 0$, so $|1 - x| = -(1 - x) = x - 1$.', 'Vì $x > 2$ nên $1 - x < 0$, suy ra $|1 - x| = x - 1$.'),
        ],
        [
          ex(
            'g9l7-ex1',
            'Simplifying $\\sqrt{1 - 2x + x^2}$ for $x > 2$',
            'Rút gọn căn thức $\\sqrt{1 - 2x + x^2}$ với $x > 2$',
            'Consider $\\sqrt{1 - 2x + x^2}$. Find the condition for it to be defined and simplify for $x > 2$.',
            'Cho căn thức $\\sqrt{1 - 2x + x^2}$. Tìm điều kiện xác định và rút gọn khi $x > 2$.',
            [
              s('Step 1: Rewrite radicand', 'Bước 1: Biến đổi biểu thức dưới căn', 'Notice $1 - 2x + x^2 = (1 - x)^2 \\ge 0$ for all $x \\in \\mathbb{R}$.', 'Ta có $1 - 2x + x^2 = (1 - x)^2 \\ge 0$ với mọi $x$, nên căn thức luôn xác định.'),
              s('Step 2: Apply identity', 'Bước 2: Áp dụng hằng đẳng thức', '$\\sqrt{(1 - x)^2} = |1 - x|$.', 'Áp dụng $\\sqrt{A^2} = |A|$, ta có $\\sqrt{(1 - x)^2} = |1 - x|$.'),
              s('Step 3: Remove absolute value', 'Bước 3: Phá dấu giá trị tuyệt đối', 'Since $x > 2$, $1 - x < 0$, so $|1 - x| = x - 1$.', 'Với $x > 2$ thì $1 - x < 0$, do đó $|1 - x| = x - 1$.'),
            ],
            'For $x > 2$, $\\sqrt{1 - 2x + x^2} = x - 1$.',
            'Với $x > 2$, biểu thức rút gọn thành $x - 1$.'
          ),
        ],
        ['Tiếng Anh phân biệt rõ "a square root of 81" (gồm $9$ và $-9$) với "the square root of 81" (chỉ $\\sqrt{81} = 9$). Không dịch word-by-word "has meaning" cho "có nghĩa", hãy dùng "is defined".']
      ),
      lesson(
        9, 3, 8,
        'Square Roots of Products and Quotients',
        'Khai căn bậc hai với phép nhân và phép chia',
        ['Use $\\sqrt{A}\\cdot\\sqrt{B} = \\sqrt{AB}$ for $A, B \\ge 0$ and $\\sqrt{A} : \\sqrt{B} = \\sqrt{A : B}$ for $A \\ge 0, B > 0$.', 'Read compound radical products and quotients aloud clearly.'],
        ['Vận dụng quy tắc khai căn một tích và một thương kèm đúng điều kiện.', 'Đọc thành thạo các biểu thức tích, thương chứa dấu căn.'],
        [
          v('g9l8-v1', 'take the square root of', 'v phr', 'khai căn bậc hai', 'Compute the square root of an expression or number.', 'Thực hiện phép khai phương một số hoặc biểu thức.', 'Taking the square root of a product, $\\sqrt{100 \\cdot 4} = 10 \\cdot 2 = 20$.', 'Khai căn một tích, ta có $\\sqrt{100 \\cdot 4} = 10 \\cdot 2 = 20$.'),
          v('g9l8-v2', 'strictly positive', 'adj phr', 'dương thực sự ($> 0$)', 'Strictly greater than zero, required for the denominator radicand.', 'Lớn hơn hẳn $0$, bắt buộc với biểu thức dưới căn ở mẫu.', 'For the quotient rule, $B$ must be strictly positive ($B > 0$).', 'Đối với quy tắc khai căn một thương, $B$ phải dương thực sự ($B > 0$).'),
          v('g9l8-v3', 'the rule holds when ...', 'phr', 'quy tắc đúng khi ...', 'Specifying the exact algebraic domain under which an identity is valid.', 'Nêu điều kiện để phép biến đổi có hiệu lực.', 'The rule $\\sqrt{A}\\sqrt{B} = \\sqrt{AB}$ holds when $A \\ge 0$ and $B \\ge 0$.', 'Quy tắc $\\sqrt{A}\\sqrt{B} = \\sqrt{AB}$ đúng khi $A \\ge 0$ và $B \\ge 0$.'),
        ],
        [
          n('g9l8-n1', '\\sqrt{A} \\cdot \\sqrt{B} = \\sqrt{AB}', 'root A times root B equals the square root of A B', 'căn A nhân căn B bằng căn của tích A B'),
          n('g9l8-n2', '\\frac{\\sqrt{A}}{\\sqrt{B}} = \\sqrt{\\frac{A}{B}}', 'root A over root B equals the square root of A over B', 'căn A phần căn B bằng căn của A phần B'),
        ],
        [
          e('g9l8-e1', 'describe', 'The square root of a product of two non-negative numbers equals the product of their square roots.', 'Căn bậc hai của một tích các số không âm bằng tích các căn bậc hai của chúng.'),
          e('g9l8-e2', 'question', 'Why does the rule fail for $\\sqrt{-3} \\cdot \\sqrt{-12}$?', 'Vì sao không áp dụng được quy tắc này cho $\\sqrt{-3} \\cdot \\sqrt{-12}$?'),
          e('g9l8-e3', 'present', 'Splitting the root: $\\sqrt{25a^2b^2} = 5|a||b| = -5ab$ for $a \\ge 0$ and $b < 0$.', 'Tách căn: $\\sqrt{25a^2b^2} = 5|a||b| = -5ab$ với $a \\ge 0, b < 0$.'),
        ],
        [
          ex(
            'g9l8-ex1',
            'Simplifying radical products with signed variables',
            'Rút gọn căn thức chứa biến có điều kiện dấu',
            'Simplify $\\sqrt{25a^2b^2}$ given $a \\ge 0$ and $b < 0$.',
            'Rút gọn biểu thức $\\sqrt{25a^2b^2}$ với $a \\ge 0$ và $b < 0$.',
            [
              s('Step 1: Split product', 'Bước 1: Khai căn từng thừa số', '$\\sqrt{25a^2b^2} = \\sqrt{25}\\sqrt{a^2}\\sqrt{b^2} = 5|a||b|$.', 'Ta viết $\\sqrt{25a^2b^2} = \\sqrt{25}\\sqrt{a^2}\\sqrt{b^2} = 5|a||b|$.'),
              s('Step 2: Apply sign conditions', 'Bước 2: Xét dấu phá trị tuyệt đối', 'Since $a \\ge 0$, $|a| = a$; since $b < 0$, $|b| = -b$.', 'Vì $a \\ge 0$ nên $|a| = a$; vì $b < 0$ nên $|b| = -b$.'),
            ],
            'Therefore $\\sqrt{25a^2b^2} = -5ab$. Check: since $b < 0$, $-5ab \\ge 0$.',
            'Vậy $\\sqrt{25a^2b^2} = -5ab$. Kiểm tra dấu: với $a \\ge 0, b < 0$ thì $-5ab \\ge 0$ hợp lệ.'
          ),
        ],
        ['Luôn chú ý điều kiện $A \\ge 0, B > 0$ trong quy tắc khai căn thương; không dùng "put outside" khi tách căn.']
      ),
      lesson(
        9, 3, 9,
        'Simplifying Expressions Containing Square Roots',
        'Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai',
        ['Take factors out of or into the root sign.', 'Clear fractions inside roots and rationalise denominators using conjugates.'],
        ['Đưa thừa số ra ngoài hoặc vào trong dấu căn.', 'Khử mẫu của biểu thức lấy căn và trục căn thức ở mẫu bằng biểu thức liên hợp.'],
        [
          v('g9l9-v1', 'take a factor out of the root sign', 'v phr', 'đưa thừa số ra ngoài dấu căn', 'Rewrite $\\sqrt{a^2b} = |a|\\sqrt{b}$ for $b \\ge 0$.', 'Biến đổi $\\sqrt{a^2b} = |a|\\sqrt{b}$ với $b \\ge 0$.', 'Taking a factor out of the root sign, $\\sqrt{45} = 3\\sqrt{5}$.', 'Đưa thừa số ra ngoài dấu căn, ta được $\\sqrt{45} = 3\\sqrt{5}$.'),
          v('g9l9-v2', 'clear the fraction inside the root', 'v phr', 'khử mẫu của biểu thức lấy căn', 'Multiply numerator and denominator inside the radical so the denominator becomes a perfect square.', 'Nhân cả tử và mẫu trong dấu căn để mẫu thành bình phương.', 'Clearing the fraction inside the root, $\\sqrt{\\frac{4}{7}} = \\frac{2\\sqrt{7}}{7}$.', 'Khử mẫu của biểu thức lấy căn: $\\sqrt{\\frac{4}{7}} = \\frac{2\\sqrt{7}}{7}$.'),
          v('g9l9-v3', 'rationalise the denominator', 'v phr', 'trục căn thức ở mẫu', 'Remove radicals from the denominator by multiplying by $\\sqrt{B}$ or the conjugate.', 'Làm mất dấu căn ở mẫu bằng cách nhân thêm căn hoặc biểu thức liên hợp.', 'Rationalise the denominator of $\\frac{1}{\\sqrt{5}-2}$ by multiplying by $\\sqrt{5}+2$.', 'Trục căn thức ở mẫu của $\\frac{1}{\\sqrt{5}-2}$ bằng cách nhân với $\\sqrt{5}+2$.'),
          v('g9l9-v4', 'conjugate expression', 'n phr', 'biểu thức liên hợp', 'Pairing $\\sqrt{A} - B$ with $\\sqrt{A} + B$ to form a difference of two squares.', 'Cặp biểu thức $\\sqrt{A} - B$ và $\\sqrt{A} + B$ tạo thành hiệu hai bình phương.', 'The conjugate expression of $3 - 2\\sqrt{2}$ is $3 + 2\\sqrt{2}$.', 'Biểu thức liên hợp của $3 - 2\\sqrt{2}$ là $3 + 2\\sqrt{2}$.'),
        ],
        [
          n('g9l9-n1', '\\frac{C}{\\sqrt{A}-B} = \\frac{C(\\sqrt{A}+B)}{A-B^2}', 'C over, in brackets, root A minus B, equals C times root A plus B, over A minus B squared', 'C phần căn A trừ B bằng C nhân mở ngoặc căn A cộng B, tất cả trên A trừ B bình phương'),
        ],
        [
          e('g9l9-e1', 'describe', 'To rationalise a denominator of the form $\\sqrt{A} - B$, multiply numerator and denominator by its conjugate $\\sqrt{A} + B$.', 'Để trục căn thức ở mẫu dạng $\\sqrt{A} - B$, ta nhân cả tử và mẫu với biểu thức liên hợp $\\sqrt{A} + B$.'),
          e('g9l9-e2', 'question', 'What is the conjugate expression of the denominator?', 'Biểu thức liên hợp của mẫu thức là gì?'),
          e('g9l9-e3', 'present', 'Since $75 = 3 \\cdot 5^2$, we have $\\sqrt{75} = 5\\sqrt{3}$.', 'Vì $75 = 3 \\cdot 5^2$ nên $\\sqrt{75} = 5\\sqrt{3}$.'),
        ],
        [
          ex(
            'g9l9-ex1',
            'Combining radical simplification rules',
            'Phối hợp rút gọn biểu thức chứa căn',
            'Simplify $A = 2\\sqrt{3} - \\sqrt{75} + \\sqrt{(1 - \\sqrt{3})^2}$.',
            'Rút gọn $A = 2\\sqrt{3} - \\sqrt{75} + \\sqrt{(1 - \\sqrt{3})^2}$.',
            [
              s('Step 1: Factor out', 'Bước 1: Đưa thừa số ra ngoài dấu căn', '$\\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}$.', 'Ta có $\\sqrt{75} = 5\\sqrt{3}$.'),
              s('Step 2: Apply absolute value identity', 'Bước 2: Áp dụng $\\sqrt{A^2} = |A|$', '$\\sqrt{(1 - \\sqrt{3})^2} = |1 - \\sqrt{3}| = \\sqrt{3} - 1$ since $1 < \\sqrt{3}$.', 'Vì $1 < \\sqrt{3}$ nên $\\sqrt{(1 - \\sqrt{3})^2} = |1 - \\sqrt{3}| = \\sqrt{3} - 1$.'),
              s('Step 3: Combine like radicals', 'Bước 3: Thu gọn đồng dạng', '$A = 2\\sqrt{3} - 5\\sqrt{3} + \\sqrt{3} - 1 = -2\\sqrt{3} - 1$.', 'Thay vào được $A = 2\\sqrt{3} - 5\\sqrt{3} + \\sqrt{3} - 1 = -2\\sqrt{3} - 1$.'),
            ],
            'Thus $A = -2\\sqrt{3} - 1$.',
            'Vậy $A = -2\\sqrt{3} - 1$.'
          ),
        ],
        ['Phân biệt rạch ròi "khử mẫu của biểu thức lấy căn" (clear the fraction inside the root) và "trục căn thức ở mẫu" (rationalise the denominator). Anh-Mỹ viết "rationalize", Anh-Anh viết "rationalise".']
      ),
      lesson(
        9, 3, 10,
        'Cube Roots and Cube Root Expressions',
        'Căn bậc ba và căn thức bậc ba',
        ['Read and evaluate cube roots $\\sqrt[3]{a}$ for positive, zero, and negative real numbers.', 'Use $(\\sqrt[3]{A})^3 = \\sqrt[3]{A^3} = A$ without absolute value signs.'],
        ['Tính căn bậc ba của mọi số thực, kể cả số âm.', 'Vận dụng $(\\sqrt[3]{A})^3 = \\sqrt[3]{A^3} = A$ (không cần giá trị tuyệt đối).'],
        [
          v('g9l10-v1', 'cube root', 'n phr', 'căn bậc ba', 'The unique real number $x$ satisfying $x^3 = a$, written $\\sqrt[3]{a}$.', 'Số thực duy nhất $x$ sao cho $x^3 = a$, ký hiệu $\\sqrt[3]{a}$.', 'Every real number has exactly one cube root; $\\sqrt[3]{-27} = -3$.', 'Mỗi số thực đều có duy nhất một căn bậc ba; $\\sqrt[3]{-27} = -3$.'),
          v('g9l10-v2', 'index of the root', 'n phr', 'chỉ số của căn', 'The small number indicating which root is taken; $3$ in $\\sqrt[3]{a}$.', 'Số nhỏ ghi trên dấu căn chỉ bậc của căn; số $3$ trong $\\sqrt[3]{a}$.', 'In $\\sqrt[3]{a}$, $3$ is the index of the root.', 'Trong ký hiệu $\\sqrt[3]{a}$, số $3$ là chỉ số của căn.'),
        ],
        [
          n('g9l10-n1', '\\sqrt[3]{-27} = -3', 'the cube root of minus twenty-seven equals minus three', 'căn bậc ba của âm hai mươi bảy bằng âm ba'),
          n('g9l10-n2', '(\\sqrt[3]{A})^3 = \\sqrt[3]{A^3} = A', 'the cube root of A, all cubed, equals the cube root of A cubed, equals A', 'căn bậc ba của A tất cả lập phương bằng căn bậc ba của A lập phương và bằng A'),
        ],
        [
          e('g9l10-e1', 'describe', 'Unlike square roots, negative numbers have real cube roots and $\\sqrt[3]{A^3} = A$ needs no absolute value.', 'Khác với căn bậc hai, số âm có căn bậc ba và $\\sqrt[3]{A^3} = A$ không cần giá trị tuyệt đối.'),
          e('g9l10-e2', 'question', 'Why is no absolute value needed in $\\sqrt[3]{(x+1)^3}$?', 'Vì sao trong $\\sqrt[3]{(x+1)^3}$ không cần giá trị tuyệt đối?'),
          e('g9l10-e3', 'present', 'Recognising the cube of a sum, $x^3 + 3x^2 + 3x + 1 = (x + 1)^3$.', 'Nhận ra hằng đẳng thức lập phương của một tổng: $x^3 + 3x^2 + 3x + 1 = (x + 1)^3$.'),
        ],
        [
          ex(
            'g9l10-ex1',
            'Simplifying a cube root expression',
            'Rút gọn căn thức bậc ba',
            'Simplify $-x + 5 + \\sqrt[3]{x^3 + 3x^2 + 3x + 1}$ and evaluate at $x = -6.5$.',
            'Rút gọn $-x + 5 + \\sqrt[3]{x^3 + 3x^2 + 3x + 1}$ rồi tính giá trị tại $x = -6{,}5$.',
            [
              s('Step 1: Rewrite radicand', 'Bước 1: Biến đổi biểu thức dưới dấu căn', '$x^3 + 3x^2 + 3x + 1 = (x + 1)^3$.', 'Biểu thức dưới căn bằng $(x + 1)^3$.'),
              s('Step 2: Apply cube root identity', 'Bước 2: Áp dụng $\\sqrt[3]{A^3} = A$', '$\\sqrt[3]{(x+1)^3} = x + 1$ for all $x \\in \\mathbb{R}$.', 'Ta có $\\sqrt[3]{(x+1)^3} = x + 1$ với mọi $x$.'),
              s('Step 3: Simplify', 'Bước 3: Thu gọn biểu thức', '$-x + 5 + x + 1 = 6$, which is constant for all $x$.', '$-x + 5 + x + 1 = 6$, không phụ thuộc vào $x$.'),
            ],
            'The value at $x = -6.5$ is $6$.',
            'Giá trị tại $x = -6{,}5$ bằng $6$.'
          ),
        ],
        ['Luôn nói "the cube root of $a$" (vì là duy nhất), không nói "a cube root of $a$".']
      ),
    ]),
    chapter(9, 4, 'Right Triangle Trigonometry', 'Hệ thức lượng trong tam giác vuông', [
      lesson(
        9, 4, 11,
        'Trigonometric Ratios of Acute Angles',
        'Tỉ số lượng giác của góc nhọn',
        ['Define sine, cosine, tangent, and cotangent of an acute angle.', 'Use exact values for $30^\\circ, 45^\\circ, 60^\\circ$ and complementary-angle relations.'],
        ['Phát biểu định nghĩa $\\sin, \\cos, \\tan, \\cot$ của góc nhọn.', 'Vận dụng bảng giá trị $30^\\circ, 45^\\circ, 60^\\circ$ và tỉ số hai góc phụ nhau.'],
        [
          v('g9l11-v1', 'hypotenuse / opposite side / adjacent side', 'n phr', 'cạnh huyền / cạnh đối / cạnh kề', 'The three sides of a right triangle relative to an acute angle.', 'Ba cạnh của tam giác vuông xét theo một góc nhọn.', 'In right triangle $ABC$ at $A$, $BC$ is the hypotenuse and $AC$ is opposite angle $B$.', 'Trong tam giác $ABC$ vuông tại $A$, $BC$ là cạnh huyền và $AC$ là cạnh đối của góc $B$.'),
          v('g9l11-v2', 'sine / cosine / tangent / cotangent', 'n', 'sin / côsin / tang / côtang', 'The four trigonometric ratios of an acute angle $\\alpha$: $\\sin\\alpha, \\cos\\alpha, \\tan\\alpha, \\cot\\alpha$.', 'Bốn tỉ số lượng giác của góc nhọn $\\alpha$.', 'The sine of an angle is the ratio of the opposite side to the hypotenuse.', 'Sin của một góc nhọn là tỉ số giữa cạnh đối và cạnh huyền.'),
          v('g9l11-v3', 'complementary angles', 'n phr', 'hai góc phụ nhau', 'Two angles whose sum is $90^\\circ$; $\\sin\\alpha = \\cos\\beta$ when $\\alpha + \\beta = 90^\\circ$.', 'Hai góc có tổng số đo bằng $90^\\circ$.', 'The two acute angles of a right triangle are complementary.', 'Hai góc nhọn của một tam giác vuông phụ nhau.'),
        ],
        [
          n('g9l11-n1', '\\sin\\alpha = \\frac{\\text{opposite}}{\\text{hypotenuse}}', 'sine alpha equals opposite over hypotenuse', 'sin an-pha bằng cạnh đối trên cạnh huyền'),
          n('g9l11-n2', '\\sin 27^\\circ \\approx 0.454', 'sine twenty-seven degrees is approximately nought point four five four', 'sin hai mươi bảy độ xấp xỉ không phẩy bốn năm tư'),
        ],
        [
          e('g9l11-e1', 'describe', 'Triangle $ABC$ is right-angled at $A$.', 'Tam giác $ABC$ vuông tại $A$.'),
          e('g9l11-e2', 'question', 'With respect to angle $B$, which side is opposite and which side is adjacent?', 'Đối với góc $B$, cạnh nào là cạnh đối và cạnh nào là cạnh kề?'),
          e('g9l11-e3', 'present', 'By the Pythagorean theorem, $BC = 5\\text{ cm}$, so $\\sin B = \\frac{AC}{BC} = \\frac{4}{5}$.', 'Theo định lí Pythagore, $BC = 5\\text{ cm}$, nên $\\sin B = \\frac{AC}{BC} = \\frac{4}{5}$.'),
        ],
        [
          ex(
            'g9l11-ex1',
            'Computing trig ratios in a 3-4-5 right triangle',
            'Tính tỉ số lượng giác trong tam giác vuông 3-4-5',
            'Triangle $ABC$ is right-angled at $A$ with $AB = 3\\text{ cm}, AC = 4\\text{ cm}$. Find $\\sin B, \\cos B, \\tan B$.',
            'Tam giác $ABC$ vuông tại $A$ có $AB = 3\\text{ cm}, AC = 4\\text{ cm}$. Tính $\\sin B, \\cos B, \\tan B$.',
            [
              s('Step 1: Find hypotenuse', 'Bước 1: Tính cạnh huyền', 'By Pythagoras, $BC^2 = 3^2 + 4^2 = 25 \\Rightarrow BC = 5\\text{ cm}$.', 'Áp dụng định lí Pythagore, $BC = \\sqrt{3^2 + 4^2} = 5\\text{ cm}$.'),
              s('Step 2: Apply ratios for angle B', 'Bước 2: Áp dụng định nghĩa cho góc B', '$\\sin B = \\frac{AC}{BC} = \\frac{4}{5},\\; \\cos B = \\frac{AB}{BC} = \\frac{3}{5},\\; \\tan B = \\frac{AC}{AB} = \\frac{4}{3}$.', 'Ta có $\\sin B = \\frac{4}{5}, \\cos B = \\frac{3}{5}, \\tan B = \\frac{4}{3}$.'),
            ],
            '$\\sin B = \\frac{4}{5}, \\cos B = \\frac{3}{5}, \\tan B = \\frac{4}{3}$.',
            'Các tỉ số lượng giác lần lượt là $\\frac{4}{5}, \\frac{3}{5}, \\frac{4}{3}$.'
          ),
        ],
        ['Khi đọc bằng tiếng Anh dùng tên đầy đủ "sine, cosine, tangent, cotangent" (dù viết ký hiệu là $\\sin, \\cos, \\tan, \\cot$).']
      ),
      lesson(
        9, 4, 12,
        'Relationships Between Sides and Angles in a Right Triangle',
        'Một số hệ thức giữa cạnh và góc trong tam giác vuông và ứng dụng',
        ['Solve a right triangle from two given measurements.', 'Apply angles of elevation and depression to real-life indirect measurement.'],
        ['Giải tam giác vuông khi biết hai yếu tố.', 'Ứng dụng góc nâng, góc hạ vào các bài toán đo chiều cao, khoảng cách thực tế.'],
        [
          v('g9l12-v1', 'leg', 'n', 'cạnh góc vuông', 'Either of the two sides forming the right angle.', 'Một trong hai cạnh kề với góc vuông.', '$AB$ and $AC$ are the two legs of right triangle $ABC$.', '$AB$ và $AC$ là hai cạnh góc vuông của tam giác $ABC$.'),
          v('g9l12-v2', 'angle of elevation / depression', 'n phr', 'góc nâng / góc hạ', 'The angle formed above (elevation) or below (depression) the horizontal line of sight.', 'Góc tạo bởi tia ngắm hướng lên (góc nâng) hoặc hướng xuống (góc hạ) so với phương ngang.', 'The angle of elevation to the top of the tree is $40^\\circ$.', 'Góc nâng từ cuối bóng tới ngọn cây là $40^\\circ$.'),
          v('g9l12-v3', 'solve a right triangle', 'v phr', 'giải tam giác vuông', 'Find all unknown side lengths and acute angles of a right triangle.', 'Tìm độ dài tất cả các cạnh và số đo các góc còn lại của tam giác vuông.', 'Solve the right triangle, giving angles to the nearest degree.', 'Giải tam giác vuông, làm tròn số đo góc đến độ.'),
        ],
        [
          n('g9l12-n1', 'AC = BC\\sin B = AB\\tan B', 'AC equals BC times sine B, equals AB times tangent B', 'AC bằng BC nhân sin B, bằng AB nhân tang B'),
        ],
        [
          e('g9l12-e1', 'describe', 'In a right triangle, each leg equals the hypotenuse times the sine of the opposite angle.', 'Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh huyền nhân với sin góc đối.'),
          e('g9l12-e2', 'question', 'Why is tangent more convenient than sine in this problem?', 'Vì sao dùng tang trong bài toán này thuận tiện hơn dùng sin?'),
          e('g9l12-e3', 'present', 'Since $\\tan 40^\\circ = \\frac{h}{25}$, the height is $h = 25\\tan 40^\\circ \\approx 21.0\\text{ m}$.', 'Vì $\\tan 40^\\circ = \\frac{h}{25}$ nên chiều cao cây là $h = 25\\tan 40^\\circ \\approx 21{,}0\\text{ m}$.'),
        ],
        [
          ex(
            'g9l12-ex1',
            'Measuring tree height using angle of elevation',
            'Tính chiều cao cây bằng góc nâng',
            'A tree casts a $25\\text{ m}$ shadow and the angle of elevation to its top is $40^\\circ$. Find its height to the nearest tenth of a metre.',
            'Một cái cây có bóng dài $25\\text{ m}$ và góc nâng từ cuối bóng lên ngọn cây là $40^\\circ$. Tính chiều cao cây (làm tròn đến hàng phần mười).',
            [
              s('Step 1: Identify opposite and adjacent', 'Bước 1: Xác định cạnh đối và cạnh kề', 'Height $h$ is opposite the $40^\\circ$ angle; shadow $25\\text{ m}$ is adjacent.', 'Chiều cao $h$ là cạnh đối và bóng dài $25\\text{ m}$ là cạnh kề góc $40^\\circ$.'),
              s('Step 2: Apply tangent ratio', 'Bước 2: Áp dụng tỉ số tang', '$\\tan 40^\\circ = \\frac{h}{25} \\Rightarrow h = 25\\tan 40^\\circ \\approx 21.0\\text{ m}$.', 'Ta có $\\tan 40^\\circ = \\frac{h}{25} \\Rightarrow h = 25\\tan 40^\\circ \\approx 21{,}0\\text{ m}$.'),
            ],
            'The tree is approximately $21.0\\text{ m}$ high.',
            'Cây cao xấp xỉ $21{,}0\\text{ m}$.'
          ),
        ],
        ['Chú ý phân biệt "horizontal" (phương ngang) và "vertical" (phương thẳng đứng) khi mô tả hình vẽ thực tế.']
      ),
    ]),
    chapter(9, 5, 'Circles', 'Đường tròn', [
      lesson(
        9, 5, 13,
        'Circles',
        'Mở đầu về đường tròn',
        ['Identify centre, radius, diameter, and symmetry of a circle.', 'Apply the perpendicularity of a radius to a tangent line at the point of tangency.'],
        ['Nhận biết tâm, bán kính, đường kính và tính đối xứng của đường tròn.', 'Vận dụng tính chất tiếp tuyến vuông góc với bán kính đi qua tiếp điểm.'],
        [
          v('g9l13-v1', 'circle / centre / radius / diameter', 'n', 'đường tròn / tâm / bán kính / đường kính', 'The set of points at distance $R$ (radius) from centre $O$; diameter $d = 2R$.', 'Tập hợp các điểm cách tâm $O$ một khoảng $R$; đường kính $d = 2R$.', 'Since $OA$ and $OB$ are radii of the same circle, $OA = OB$.', 'Vì $OA$ và $OB$ là hai bán kính của cùng một đường tròn nên $OA = OB$.'),
          v('g9l13-v2', 'tangent / point of tangency', 'n phr', 'tiếp tuyến / tiếp điểm', 'A line touching the circle at exactly one point (point of tangency).', 'Đường thẳng chỉ có một điểm chung với đường tròn.', 'Since $PA$ is tangent to the circle at $A$, $OA \\perp PA$.', 'Vì $PA$ là tiếp tuyến của đường tròn tại $A$ nên $OA \\perp PA$.'),
        ],
        [
          n('g9l13-n1', 'OA \\perp PA', 'O A is perpendicular to P A', 'OA vuông góc với PA'),
        ],
        [
          e('g9l13-e1', 'describe', 'The two tangent segments drawn from the same external point are equal.', 'Hai tiếp tuyến xuất phát từ cùng một điểm ngoài đường tròn thì bằng nhau.'),
          e('g9l13-e2', 'question', 'Why is triangle $OAP$ right-angled at $A$?', 'Vì sao tam giác $OAP$ vuông tại $A$?'),
          e('g9l13-e3', 'present', 'By the Pythagorean theorem, $PA = \\sqrt{OP^2 - OA^2} = \\sqrt{13^2 - 5^2} = 12\\text{ cm}$.', 'Theo định lí Pythagore, $PA = \\sqrt{13^2 - 5^2} = 12\\text{ cm}$.'),
        ],
        [
          ex(
            'g9l13-ex1',
            'Tangent length from an external point',
            'Tính độ dài tiếp tuyến từ điểm ngoài đường tròn',
            'A circle has centre $O$, radius $5\\text{ cm}$, and $OP = 13\\text{ cm}$ where $PA, PB$ are tangents. Find $PA$ and $PB$.',
            'Cho đường tròn $(O; 5\\text{ cm})$, điểm $P$ thỏa mãn $OP = 13\\text{ cm}$, kẻ hai tiếp tuyến $PA, PB$. Tính $PA, PB$.',
            [
              s('Step 1: Use tangent property', 'Bước 1: Dùng tính chất tiếp tuyến', 'Since $PA$ is tangent at $A$, $OA \\perp PA$, so $\\triangle OAP$ is right-angled at $A$.', 'Vì $PA$ là tiếp tuyến tại $A$ nên $OA \\perp PA$, suy ra $\\triangle OAP$ vuông tại $A$.'),
              s('Step 2: Apply Pythagoras', 'Bước 2: Áp dụng Pythagore', '$PA = \\sqrt{13^2 - 5^2} = 12\\text{ cm}$, and $PB = PA = 12\\text{ cm}$.', 'Tính được $PA = 12\\text{ cm}$ và theo tính chất hai tiếp tuyến cắt nhau, $PB = PA = 12\\text{ cm}$.'),
            ],
            'Therefore $PA = PB = 12\\text{ cm}$.',
            'Vậy $PA = PB = 12\\text{ cm}$.'
          ),
        ],
        ['Chú ý dùng dạng số nhiều bất quy tắc "radii" (những bán kính) của "radius".']
      ),
      lesson(
        9, 5, 14,
        'Arcs and Chords of a Circle',
        'Cung và dây của một đường tròn',
        ['Distinguish minor arc, major arc, semicircle, and chord.', 'Relate the measure of a minor arc to its central angle and prove a diameter is the longest chord.'],
        ['Phân biệt cung nhỏ, cung lớn, nửa đường tròn và dây cung.', 'Liên hệ số đo cung với góc ở tâm và chứng minh đường kính là dây lớn nhất.'],
        [
          v('g9l14-v1', 'chord', 'n', 'dây (dây cung)', 'A line segment whose two endpoints lie on the circle.', 'Đoạn thẳng nối hai điểm nằm trên đường tròn.', 'Every chord has length at most $2R$; a diameter is the longest chord.', 'Mọi dây cung có độ dài không quá $2R$; đường kính là dây lớn nhất.'),
          v('g9l14-v2', 'minor arc / major arc', 'n phr', 'cung nhỏ / cung lớn', 'Arcs shorter or longer than a semicircle connecting two points on a circle.', 'Cung có số đo nhỏ hơn hoặc lớn hơn $180^\\circ$.', 'The measure of major arc $AB$ is $360^\\circ$ minus the measure of minor arc $AB$.', 'Số đo cung lớn $AB$ bằng $360^\\circ$ trừ số đo cung nhỏ $AB$.'),
          v('g9l14-v3', 'central angle', 'n phr', 'góc ở tâm', 'An angle whose vertex is at the centre $O$ of the circle.', 'Góc có đỉnh trùng với tâm đường tròn.', '$\\angle AOB$ is a central angle intercepting minor arc $AB$.', '$\\angle AOB$ là góc ở tâm chắn cung nhỏ $AB$.'),
        ],
        [
          n('g9l14-n1', '\\text{sd}\\,\\overset{\\frown}{AB} = \\angle AOB', 'the measure of minor arc A B equals the measure of central angle A O B', 'số đo cung nhỏ AB bằng số đo góc ở tâm AOB'),
        ],
        [
          e('g9l14-e1', 'describe', 'The measure of a minor arc equals the measure of its central angle.', 'Số đo cung nhỏ bằng số đo của góc ở tâm chắn cung đó.'),
          e('g9l14-e2', 'question', 'Can a chord of a circle with radius $5\\text{ cm}$ have length $11\\text{ cm}$?', 'Một dây của đường tròn bán kính $5\\text{ cm}$ có thể dài $11\\text{ cm}$ không?'),
          e('g9l14-e3', 'present', 'Since $OA = OB = AB = 6\\text{ cm}$, triangle $OAB$ is equilateral, so $\\angle AOB = 60^\\circ$.', 'Vì $OA = OB = AB = 6\\text{ cm}$ nên $\\triangle OAB$ đều, suy ra $\\angle AOB = 60^\\circ$.'),
        ],
        [
          ex(
            'g9l14-ex1',
            'Arc measures when chord equals radius',
            'Tính số đo cung khi dây bằng bán kính',
            'In a circle of radius $6\\text{ cm}$, chord $AB = 6\\text{ cm}$. Find the measures of minor and major arcs $AB$.',
            'Cho đường tròn bán kính $6\\text{ cm}$ và dây $AB = 6\\text{ cm}$. Tính số đo cung nhỏ và cung lớn $AB$.',
            [
              s('Step 1: Equilateral triangle', 'Bước 1: Chứng minh tam giác đều', '$OA = OB = AB = 6\\text{ cm}$, so $\\triangle OAB$ is equilateral and $\\angle AOB = 60^\\circ$.', 'Vì $OA = OB = AB = 6\\text{ cm}$ nên $\\triangle OAB$ đều, $\\angle AOB = 60^\\circ$.'),
              s('Step 2: Find arc measures', 'Bước 2: Tính số đo hai cung', 'Minor arc $AB$ measures $60^\\circ$; major arc $AB$ measures $360^\\circ - 60^\\circ = 300^\\circ$.', 'Cung nhỏ $AB$ có số đo $60^\\circ$; cung lớn $AB$ có số đo $300^\\circ$.'),
            ],
            'Minor arc: $60^\\circ$; major arc: $300^\\circ$.',
            'Số đo cung nhỏ là $60^\\circ$, cung lớn là $300^\\circ$.'
          ),
        ],
        ['Chú ý từ "intercepted arc" (cung bị chắn) và động từ "subtend" (chắn).']
      ),
      lesson(
        9, 5, 15,
        'Arc Length, Sectors and Annuli',
        'Độ dài cung tròn, diện tích hình quạt tròn và hình vành khuyên',
        ['Calculate arc length $l = \\frac{n}{360}\\cdot 2\\pi R$ and sector area $S = \\frac{n}{360}\\cdot \\pi R^2$.', 'Compute the area of an annulus $\\pi(R^2 - r^2)$ and connect a sector net to a cone.'],
        ['Tính độ dài cung tròn và diện tích hình quạt tròn theo tỉ lệ $\\frac{n}{360}$.', 'Tính diện tích hình vành khuyên và liên hệ hình quạt tròn với mặt xung quanh hình nón.'],
        [
          v('g9l15-v1', 'arc length / sector', 'n', 'độ dài cung tròn / hình quạt tròn', 'A sector is bounded by two radii and an arc of angle $n^\\circ$.', 'Hình quạt tròn giới hạn bởi hai bán kính và một cung tròn.', 'The sector occupies $\\frac{n}{360}$ of the full circle.', 'Hình quạt tròn chiếm $\\frac{n}{360}$ hình tròn.'),
          v('g9l15-v2', 'annulus (pl. annuli)', 'n', 'hình vành khuyên / hình vành khăn', 'The ring-shaped region between two concentric circles of radii $R > r$.', 'Phần mặt phẳng nằm giữa hai đường tròn đồng tâm bán kính $R > r$.', 'The annulus area is $\\pi(R^2 - r^2)$.', 'Diện tích hình vành khuyên là $\\pi(R^2 - r^2)$.'),
          v('g9l15-v3', 'concentric circles', 'n phr', 'hai đường tròn đồng tâm', 'Circles sharing the same centre but having different radii.', 'Hai đường tròn có cùng tâm nhưng bán kính khác nhau.', 'A circular garden path forms an annulus between two concentric circles.', 'Lối đi quanh vườn tròn là hình vành khuyên giữa hai đường tròn đồng tâm.'),
        ],
        [
          n('g9l15-n1', 'l = \\frac{n}{360} \\cdot 2\\pi R', 'arc length l equals n over three hundred and sixty times two pi R', 'độ dài cung l bằng n phần 360 nhân 2 pi R'),
          n('g9l15-n2', 'S = \\pi(R^2 - r^2)', 'annulus area S equals pi times, in brackets, R squared minus r squared', 'diện tích hình vành khuyên bằng pi nhân mở ngoặc R bình trừ r bình'),
        ],
        [
          e('g9l15-e1', 'describe', 'When a sector is rolled into a cone, its arc becomes the base circumference and its radius becomes the slant height.', 'Khi cuộn hình quạt thành hình nón, cung tròn thành chu vi đáy còn bán kính quạt thành đường sinh.'),
          e('g9l15-e2', 'question', 'What fraction of the full circle does a $150^\\circ$ sector occupy?', 'Hình quạt $150^\\circ$ chiếm bao nhiêu phần của cả hình tròn?'),
          e('g9l15-e3', 'present', 'With $R = 18\\text{ cm}$ and $n = 120^\\circ$, the arc length is $\\frac{120}{360}\\cdot 2\\pi \\cdot 18 = 12\\pi\\text{ cm}$.', 'Với $R = 18\\text{ cm}, n = 120^\\circ$, độ dài cung là $12\\pi\\text{ cm}$.'),
        ],
        [
          ex(
            'g9l15-ex1',
            'Rolling a sector into a conical party hat',
            'Cuộn hình quạt thành chiếc mũ hình nón',
            'A sector of radius $18\\text{ cm}$ and central angle $120^\\circ$ is rolled into a cone. Find its arc length, sector area, and cone base radius $r$.',
            'Một hình quạt bán kính $18\\text{ cm}$, góc ở tâm $120^\\circ$ được cuộn thành hình nón. Tính độ dài cung, diện tích quạt và bán kính đáy hình nón.',
            [
              s('Step 1: Arc length', 'Bước 1: Tính độ dài cung', '$l = \\frac{120}{360} \\cdot 2\\pi \\cdot 18 = 12\\pi\\text{ cm}$.', 'Độ dài cung là $l = \\frac{120}{360} \\cdot 2\\pi \\cdot 18 = 12\\pi\\text{ cm}$.'),
              s('Step 2: Cone base radius', 'Bước 2: Tìm bán kính đáy nón', 'Since $2\\pi r = 12\\pi$, we obtain $r = 6\\text{ cm}$.', 'Vì chu vi đáy bằng độ dài cung nên $2\\pi r = 12\\pi \\Rightarrow r = 6\\text{ cm}$.'),
              s('Step 3: Sector area', 'Bước 3: Tính diện tích hình quạt', '$S = \\frac{120}{360} \\cdot \\pi \\cdot 18^2 = 108\\pi\\text{ cm}^2$.', 'Diện tích quạt là $108\\pi\\text{ cm}^2$, chính là diện tích xung quanh hình nón.'),
            ],
            'Base radius $r = 6\\text{ cm}$; lateral paper needed is $108\\pi\\text{ cm}^2$.',
            'Bán kính đáy nón $r = 6\\text{ cm}$, diện tích xung quanh là $108\\pi\\text{ cm}^2$.'
          ),
        ],
        ['Nhấn mạnh số nhiều của "annulus" là "annuli" (hoặc "annuluses").']
      ),
      lesson(
        9, 5, 16,
        'Relative Positions of a Line and a Circle',
        'Vị trí tương đối của đường thẳng và đường tròn',
        ['Compare distance $d$ from centre to line with radius $R$ ($d < R, d = R, d > R$).', 'Recognise secants, tangents, and external lines.'],
        ['Xác định vị trí tương đối dựa vào so sánh khoảng cách $d$ với bán kính $R$.', 'Nhận biết cát tuyến, tiếp tuyến và đường thẳng không giao đường tròn.'],
        [
          v('g9l16-v1', 'secant', 'n', 'cát tuyến', 'A line that intersects a circle at two distinct points ($d < R$).', 'Đường thẳng cắt đường tròn tại hai điểm phân biệt ($d < R$).', 'Since $26 < 30$, the road line is a secant.', 'Vì $26 < 30$ nên đường thẳng là cát tuyến của đường tròn.'),
          v('g9l16-v2', 'external line', 'n phr', 'đường thẳng không giao đường tròn', 'A line lying completely outside the circle with no common point ($d > R$).', 'Đường thẳng nằm ngoài đường tròn và không có điểm chung ($d > R$).', 'When $d > R$, the line is an external line.', 'Khi $d > R$, đường thẳng và đường tròn không giao nhau.'),
        ],
        [
          n('g9l16-n1', 'd < R \\; / \\; d = R \\; / \\; d > R', 'd is less than R / d equals R / d is greater than R', 'd nhỏ hơn R (cắt nhau) / d bằng R (tiếp xúc) / d lớn hơn R (không giao nhau)'),
        ],
        [
          e('g9l16-e1', 'describe', 'Comparing perpendicular distance $d$ with radius $R$ determines whether the line is a secant, tangent, or external line.', 'So sánh khoảng cách vuông góc $d$ với bán kính $R$ cho biết vị trí tương đối giữa đường thẳng và đường tròn.'),
          e('g9l16-e2', 'question', 'How far must the line move so that it becomes tangent to the circle?', 'Đường thẳng cần dịch chuyển bao nhiêu để tiếp xúc với đường tròn?'),
          e('g9l16-e3', 'present', 'Since $d = 26 < 30 = R$, the line intersects the circle at two points $A$ and $B$.', 'Vì $d = 26 < 30$ nên đường thẳng cắt đường tròn tại hai điểm $A$ và $B$.'),
        ],
        [
          ex(
            'g9l16-ex1',
            'Road passing near a circular park',
            'Đoạn đường đi qua gần công viên hình tròn',
            'A circular park has radius $30\\text{ m}$ and the perpendicular distance from centre $O$ to a straight road is $26\\text{ m}$. Find the chord length $AB$ inside the park.',
            'Công viên hình tròn bán kính $30\\text{ m}$, khoảng cách từ tâm $O$ đến đường thẳng là $26\\text{ m}$. Tính độ dài dây cung $AB$.',
            [
              s('Step 1: Compare d and R', 'Bước 1: So sánh d và R', '$d = 26 < 30 = R$, so the road is a secant.', '$d = 26 < 30$ nên đường là cát tuyến cắt đường tròn tại $A, B$.'),
              s('Step 2: Use right triangle OHA', 'Bước 2: Áp dụng Pythagore trong $\\triangle OHA$', '$HA = \\sqrt{30^2 - 26^2} = \\sqrt{224} = 4\\sqrt{14}\\text{ m}$, so $AB = 2HA = 8\\sqrt{14} \\approx 29.9\\text{ m}$.', '$HA = \\sqrt{30^2 - 26^2} = 4\\sqrt{14}\\text{ m} \\Rightarrow AB = 8\\sqrt{14} \\approx 29{,}9\\text{ m}$.'),
            ],
            'Chord $AB \\approx 29.9\\text{ m}$. Moving the road $4\\text{ m}$ farther makes it tangent.',
            'Độ dài $AB \\approx 29{,}9\\text{ m}$. Dịch đường ra xa thêm $4\\text{ m}$ sẽ tiếp xúc.'
          ),
        ],
        ['Chú ý: đường thẳng cắt đường tròn tại $2$ điểm gọi là "secant" (cát tuyến), không dùng cho đoạn dây "chord".']
      ),
      lesson(
        9, 5, 17,
        'Relative Positions of Two Circles',
        'Vị trí tương đối của hai đường tròn',
        ['Determine relative positions by comparing centre distance $d = OO\'$ with $R + r$ and $|R - r|$.', 'Identify externally tangent, internally tangent, intersecting, and disjoint circles.'],
        ['Xác định vị trí tương đối của hai đường tròn bằng cách so sánh $OO\'$ với $R + r$ và $|R - r|$.', 'Nhận biết tiếp xúc ngoài, tiếp xúc trong, cắt nhau và không giao nhau.'],
        [
          v('g9l17-v1', 'externally tangent / internally tangent', 'adj phr', 'tiếp xúc ngoài / tiếp xúc trong', 'Circles sharing 1 point when $d = R + r$ (external) or $d = |R - r|$ (internal).', 'Hai đường tròn tiếp xúc nhau tại 1 điểm khi $d = R + r$ hoặc $d = |R - r|$.', 'At a point of tangency, the two centres and the point of tangency are collinear.', 'Tại tiếp điểm, hai tâm và tiếp điểm thẳng hàng.'),
          v('g9l17-v2', 'disjoint circles', 'n phr', 'hai đường tròn không giao nhau', 'Two circles with no common point ($d > R + r$ or $d < |R - r|$).', 'Hai đường tròn không có điểm chung nào.', 'When $d > R + r$, the circles lie outside each other.', 'Khi $d > R + r$, hai đường tròn nằm ngoài nhau.'),
        ],
        [
          n('g9l17-n1', '|R - r| < d < R + r', 'the absolute difference of R and r is less than d, which is less than R plus r', 'hiệu hai bán kính nhỏ hơn d nhỏ hơn tổng hai bán kính (cắt nhau)'),
        ],
        [
          e('g9l17-e1', 'describe', 'First calculate $R + r$ and $|R - r|$, then locate $d$ relative to these two boundary values.', 'Tính trước $R + r$ và $|R - r|$ rồi so sánh $d$ với hai mốc này.'),
          e('g9l17-e2', 'question', 'How many common points do the two circles have when $d = R + r$?', 'Hai đường tròn có mấy điểm chung khi $d = R + r$?'),
          e('g9l17-e3', 'present', 'Since $|6 - 4| < 8 < 6 + 4$, the two circles intersect at two points.', 'Vì $|6 - 4| < 8 < 6 + 4$ nên hai đường tròn cắt nhau tại hai điểm.'),
        ],
        [
          ex(
            'g9l17-ex1',
            'Position of two circular fountains',
            'Vị trí hai đài phun nước hình tròn',
            'Two circles have radii $6\\text{ m}$ and $4\\text{ m}$ with $d = 8\\text{ m}$. Classify their position and find how far the smaller must move away to be externally tangent.',
            'Hai đường tròn bán kính $6\\text{ m}$ và $4\\text{ m}$ có $d = 8\\text{ m}$. Xác định vị trí và khoảng dịch chuyển để tiếp xúc ngoài.',
            [
              s('Step 1: Compare with bounds', 'Bước 1: So sánh với hai mốc', '$R - r = 2 < 8 < 10 = R + r$, so they intersect at two points.', '$R - r = 2 < 8 < 10 = R + r$, nên hai đường tròn cắt nhau.'),
              s('Step 2: Adjust distance', 'Bước 2: Tính độ dịch chuyển', 'External tangency needs $d = 10\\text{ m}$, so move $2\\text{ m}$ away.', 'Tiếp xúc ngoài cần $d = 10\\text{ m}$, nên dịch ra xa $2\\text{ m}$.'),
            ],
            'They intersect; moving $2\\text{ m}$ farther gives external tangency.',
            'Hai đường tròn cắt nhau; dịch ra xa $2\\text{ m}$ sẽ tiếp xúc ngoài.'
          ),
        ],
        ['Khi hai đường tròn tiếp xúc, hai tâm và tiếp điểm thẳng hàng ("collinear").']
      ),
    ]),
    chapter(9, 6, 'Quadratic Function and Quadratic Equation', 'Hàm số $y = ax^2 (a \\ne 0)$. Phương trình bậc hai một ẩn', [
      lesson(
        9, 6, 18,
        'The Function $y = ax^2$ ($a \\ne 0$)',
        'Hàm số $y = ax^2$ ($a \\ne 0$)',
        ['Describe the parabola $y = ax^2$, its vertex, axis of symmetry, and sign properties.', 'Plot a table of values and locate symmetric points $(x; y)$ and $(-x; y)$.'],
        ['Nêu tính chất, đỉnh, trục đối xứng của đồ thị hàm số $y = ax^2$.', 'Lập bảng giá trị, vẽ parabol và xác định các điểm đối xứng qua $Oy$.'],
        [
          v('g9l18-v1', 'parabola (pl. parabolas)', 'n', 'đường parabol', 'The smooth symmetric curve formed by the graph of $y = ax^2$.', 'Đường cong đối xứng là đồ thị của hàm số $y = ax^2$.', 'Say "the graph of the function is a parabola", not "graph of the parabola".', 'Nói "đồ thị của hàm số là một parabol", không nói "đồ thị của parabol".'),
          v('g9l18-v2', 'vertex / axis of symmetry', 'n phr', 'đỉnh / trục đối xứng', 'The origin $O(0,0)$ is the vertex; the $y$-axis $Oy$ is the axis of symmetry.', 'Gốc tọa độ $O$ là đỉnh và trục tung $Oy$ là trục đối xứng.', 'The points $(x, y)$ and $(-x, y)$ are symmetrical about the $y$-axis.', 'Hai điểm $(x; y)$ và $(-x; y)$ đối xứng nhau qua trục tung.'),
          v('g9l18-v3', 'abscissa / ordinate', 'n', 'hoành độ / tung độ', 'The $x$-coordinate (abscissa) and $y$-coordinate (ordinate) of a point.', 'Hoành độ ($x$) và tung độ ($y$) của một điểm trên mặt phẳng tọa độ.', 'Find the points of the graph whose ordinate is $8$.', 'Tìm các điểm thuộc đồ thị có tung độ bằng $8$.'),
        ],
        [
          n('g9l18-n1', 'y = ax^2 \\;(a \\ne 0)', 'y equals a x squared, where a is not equal to zero', 'y bằng a x bình phương, với a khác 0'),
          n('g9l18-n2', 'y = -\\frac{x^2}{4}', 'y equals minus a quarter x squared', 'y bằng âm một phần tư x bình phương'),
        ],
        [
          e('g9l18-e1', 'describe', 'Since $a > 0$, the parabola opens upwards and lies above the $x$-axis.', 'Vì $a > 0$ nên parabol nằm phía trên trục hoành.'),
          e('g9l18-e2', 'question', 'Does the point $A(2, 2)$ belong to the graph?', 'Điểm $A(2; 2)$ có thuộc đồ thị hàm số không?'),
          e('g9l18-e3', 'present', 'Substituting $x = -2$ into $y = -2x^2$, we obtain $y = -8$.', 'Thay $x = -2$ vào $y = -2x^2$, ta được $y = -8$.'),
        ],
        [
          ex(
            'g9l18-ex1',
            'Finding symmetric points on $y = -2x^2$',
            'Tìm điểm thuộc parabol $y = -2x^2$ theo tung độ',
            'For $y = -2x^2$, find the points whose ordinate is $-\\frac{1}{2}$ and describe their symmetry.',
            'Cho hàm số $y = -2x^2$. Tìm các điểm thuộc đồ thị có tung độ bằng $-\\frac{1}{2}$ và nhận xét tính đối xứng.',
            [
              s('Step 1: Set up equation', 'Bước 1: Thay tung độ', 'Set $-2x^2 = -\\frac{1}{2} \\Rightarrow x^2 = \\frac{1}{4}$.', 'Ta có $-2x^2 = -\\frac{1}{2} \\Rightarrow x^2 = \\frac{1}{4}$.'),
              s('Step 2: Solve for x', 'Bước 2: Tìm hoành độ', '$x = \\frac{1}{2}$ or $x = -\\frac{1}{2}$. Points: $(\\frac{1}{2}, -\\frac{1}{2})$ and $(-\\frac{1}{2}, -\\frac{1}{2})$.', 'Suy ra hai điểm $(\\frac{1}{2}; -\\frac{1}{2})$ và $(-\\frac{1}{2}; -\\frac{1}{2})$.'),
            ],
            'They are symmetrical about the $y$-axis.',
            'Hai điểm đối xứng nhau qua trục tung $Oy$.'
          ),
        ],
        ['Chú ý từ học thuật "abscissa" (hoành độ) và "ordinate" (tung độ), số nhiều của "vertex" là "vertices".']
      ),
      lesson(
        9, 6, 19,
        'Quadratic Equations in One Unknown',
        'Phương trình bậc hai một ẩn',
        ['Use the discriminant $\\Delta = b^2 - 4ac$ and reduced formula $\\Delta\' = b\'^2 - ac$.', 'Determine when an equation has two distinct roots, a double root, or no root.'],
        ['Tính biệt thức $\\Delta$ và dùng công thức nghiệm thu gọn $\\Delta\'$.', 'Kết luận đúng số nghiệm (2 nghiệm phân biệt, nghiệm kép, vô nghiệm).'],
        [
          v('g9l19-v1', 'discriminant', 'n', 'biệt thức ($\\Delta$)', 'The expression $\\Delta = b^2 - 4ac$, read "delta", determining the number of real roots.', 'Biểu thức $\\Delta = b^2 - 4ac$ quyết định số nghiệm của phương trình bậc hai.', 'Since $\\Delta = 61 > 0$, the equation has two distinct roots.', 'Vì $\\Delta = 61 > 0$ nên phương trình có hai nghiệm phân biệt.'),
          v('g9l19-v2', 'double root / repeated root', 'n phr', 'nghiệm kép', 'A single repeated root $x_1 = x_2 = -\\frac{b}{2a}$ when $\\Delta = 0$.', 'Hai nghiệm trùng nhau khi $\\Delta = 0$.', 'If $\\Delta = 0$, the equation has a double root.', 'Nếu $\\Delta = 0$ thì phương trình có nghiệm kép.'),
          v('g9l19-v3', 'reduced formula', 'n phr', 'công thức nghiệm thu gọn', 'Using $b = 2b\'$ and $\\Delta\' = b\'^2 - ac$ when $b$ is even.', 'Công thức dùng $b\' = \\frac{b}{2}$ và $\\Delta\' = b\'^2 - ac$ khi $b$ chẵn.', 'When $b = 2b\'$, we may use the reduced formula.', 'Khi $b = 2b\'$, ta dùng công thức nghiệm thu gọn.'),
        ],
        [
          n('g9l19-n1', '\\Delta = b^2 - 4ac', 'delta equals b squared minus four a c', 'đen-ta bằng b bình phương trừ 4 a c'),
          n('g9l19-n2', 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}', 'x equals minus b plus or minus root delta, all over two a', 'x bằng trừ b cộng trừ căn đen-ta, tất cả trên 2 a'),
        ],
        [
          e('g9l19-e1', 'describe', 'For "vô nghiệm", say "the equation has no root", never "the equation is impossible".', 'Khi phương trình vô nghiệm, nói "the equation has no root".'),
          e('g9l19-e2', 'question', 'Can we use the reduced formula here?', 'Phương trình này có dùng được công thức nghiệm thu gọn không?'),
          e('g9l19-e3', 'present', 'Comparing with $ax^2 + bx + c = 0$, we have $a = 3, b = 7, c = -1$, giving $\\Delta = 61 > 0$.', 'Xác định $a = 3, b = 7, c = -1$, tính được $\\Delta = 61 > 0$.'),
        ],
        [
          ex(
            'g9l19-ex1',
            'Solving a quadratic using the general formula',
            'Giải phương trình bậc hai bằng công thức nghiệm',
            'Solve $3x^2 + 7x - 1 = 0$.',
            'Giải phương trình $3x^2 + 7x - 1 = 0$.',
            [
              s('Step 1: Coefficients and discriminant', 'Bước 1: Xác định hệ số và tính $\\Delta$', '$a = 3, b = 7, c = -1 \\Rightarrow \\Delta = 7^2 - 4\\cdot 3\\cdot(-1) = 61 > 0$.', '$a = 3, b = 7, c = -1 \\Rightarrow \\Delta = 49 + 12 = 61 > 0$.'),
              s('Step 2: Apply formula', 'Bước 2: Áp dụng công thức nghiệm', '$x_1 = \\frac{-7 + \\sqrt{61}}{6}$ and $x_2 = \\frac{-7 - \\sqrt{61}}{6}$.', 'Phương trình có hai nghiệm phân biệt $x_{1,2} = \\frac{-7 \\pm \\sqrt{61}}{6}$.'),
            ],
            'The equation has two distinct roots $x_1 \\approx 0.135$ and $x_2 \\approx -2.468$.',
            'Phương trình có hai nghiệm phân biệt $x_1 \\approx 0{,}135$ và $x_2 \\approx -2{,}468$.'
          ),
        ],
        ['Chữ cái $b\'$ đọc là "b prime", $\\Delta\'$ đọc là "delta prime".']
      ),
      lesson(
        9, 6, 20,
        "Viete's Theorem and Its Applications",
        'Định lí Viète và ứng dụng',
        ["State and apply Vieta's formulas $x_1 + x_2 = -\\frac{b}{a}, x_1x_2 = \\frac{c}{a}$ only when $\\Delta \\ge 0$.", 'Solve simple quadratics by inspection and find two numbers from sum $S$ and product $P$.'],
        ['Nêu và áp dụng định lí Viète khi phương trình có nghiệm ($\\Delta \\ge 0$).', 'Tính nhẩm nghiệm theo $a+b+c=0$, $a-b+c=0$ và tìm hai số biết tổng $S$, tích $P$.'],
        [
          v('g9l20-v1', 'to solve by inspection', 'v phr', 'tính nhẩm nghiệm', 'Finding roots mentally using $a + b + c = 0$ or $a - b + c = 0$.', 'Nhẩm nhanh nghiệm nhờ nhận xét hệ số.', 'Since $a + b + c = 0$, we can solve the equation by inspection.', 'Vì $a + b + c = 0$ nên ta tính nhẩm được nghiệm.'),
          v('g9l20-v2', 'remaining root', 'n phr', 'nghiệm còn lại', 'The second root deduced when one root and Vieta relations are known.', 'Nghiệm thứ hai khi đã biết một nghiệm.', 'Given one root, find the remaining root.', 'Biết một nghiệm, hãy tìm nghiệm còn lại.'),
        ],
        [
          n('g9l20-n1', 'x_1 + x_2 = -\\frac{b}{a},\\; x_1x_2 = \\frac{c}{a}', 'x one plus x two equals minus b over a, and x one times x two equals c over a', 'tổng hai nghiệm bằng âm b trên a, tích hai nghiệm bằng c trên a'),
          n('g9l20-n2', 'S^2 - 4P \\ge 0', 'S squared minus four P is greater than or equal to zero', 'S bình phương trừ 4 P lớn hơn hoặc bằng 0'),
        ],
        [
          e('g9l20-e1', 'describe', 'Viete’s theorem can only be applied when the equation has roots, i.e., $\\Delta \\ge 0$.', 'Chỉ được áp dụng định lí Viète khi phương trình có nghiệm, tức là $\\Delta \\ge 0$.'),
          e('g9l20-e2', 'question', 'Do two numbers with sum $S$ and product $P$ always exist?', 'Hai số có tổng $S$ và tích $P$ có luôn tồn tại không?'),
          e('g9l20-e3', 'present', 'Checking $S^2 - 4P = 81 - 80 = 1 \\ge 0$, the two numbers are the roots of $x^2 - 9x + 20 = 0$.', 'Kiểm tra $S^2 - 4P = 1 \\ge 0$, hai số đó là nghiệm của $x^2 - 9x + 20 = 0$.'),
        ],
        [
          ex(
            'g9l20-ex1',
            'Finding two numbers given sum and product',
            'Tìm hai số biết tổng và tích',
            'Find two numbers whose sum is $9$ and whose product is $20$.',
            'Tìm hai số có tổng bằng $9$ và tích bằng $20$.',
            [
              s('Step 1: Check existence', 'Bước 1: Kiểm tra điều kiện tồn tại', '$S^2 - 4P = 9^2 - 4(20) = 1 \\ge 0$, so the numbers exist.', '$S^2 - 4P = 81 - 80 = 1 \\ge 0$, nên hai số tồn tại.'),
              s('Step 2: Solve $x^2 - 9x + 20 = 0$', 'Bước 2: Giải phương trình $x^2 - 9x + 20 = 0$', '$\\Delta = 1 \\Rightarrow x_1 = 4, x_2 = 5$.', 'Giải được hai nghiệm $x_1 = 4, x_2 = 5$.'),
            ],
            'Hence the two numbers are $4$ and $5$.',
            'Vậy hai số cần tìm là $4$ và $5$.'
          ),
        ],
        ['Không dịch "tính nhẩm" là "calculate silently"; dùng "solve by inspection" hoặc "find mentally". Cũng chú ý: "roots of an equation" vs "zeros of a polynomial".']
      ),
      lesson(
        9, 6, 21,
        'Solving Problems by Setting Up Equations',
        'Giải bài toán bằng cách lập phương trình',
        ['Model geometry, motion (downstream/upstream), and compound interest contexts as quadratic equations.', 'Reject roots that violate domain conditions using "to be rejected".'],
        ['Thiết lập phương trình bậc hai từ các bài toán diện tích, chuyển động dòng nước và lãi kép.', 'Loại nghiệm không thỏa mãn điều kiện bằng cụm từ "to be rejected".'],
        [
          v('g9l21-v1', 'to be rejected', 'v phr', 'bị loại', 'Excluding a root that fails physical conditions such as positive length.', 'Loại bỏ nghiệm không thỏa mãn điều kiện thực tế.', 'The root $x = -60$ does not satisfy the condition, so it is rejected.', 'Nghiệm $x = -60$ không thỏa mãn điều kiện nên bị loại.'),
          v('g9l21-v2', 'downstream / upstream', 'adv', 'xuôi dòng / ngược dòng', 'Moving with or against a river current of speed $c$: $v + c$ vs $v - c$.', 'Đi cùng chiều hay ngược chiều dòng nước.', 'Going downstream, the boat travels at $x + 3\\text{ km/h}$.', 'Khi đi xuôi dòng, vận tốc ca nô là $x + 3\\text{ km/h}$.'),
          v('g9l21-v3', 'compound interest', 'n phr', 'lãi kép', 'Interest earned on both initial principal and previously accumulated interest.', 'Lãi tính trên cả vốn gốc lẫn tiền lãi các kỳ trước.', 'After $2$ years at rate $x$, the total is $100(1 + x)^2$ million dong.', 'Sau $2$ năm với lãi suất $x$, số tiền thu được là $100(1 + x)^2$ triệu đồng.'),
        ],
        [
          n('g9l21-n1', '100(1 + x)^2 = 118.81', 'one hundred, in brackets, one plus x, all squared, equals one hundred and eighteen point eight one', '100 nhân mở ngoặc 1 cộng x bình phương bằng 118,81'),
        ],
        [
          e('g9l21-e1', 'describe', 'Always declare the unknown, unit, and suitable condition before setting up the equation.', 'Luôn nêu rõ ẩn, đơn vị và điều kiện thích hợp trước khi lập phương trình.'),
          e('g9l21-e2', 'question', 'Which root is rejected and why?', 'Nghiệm nào bị loại và vì sao?'),
          e('g9l21-e3', 'present', 'Since width is positive, $x_1 = -60$ is rejected and $x_2 = 30$ is accepted.', 'Vì chiều rộng phải dương nên $x_1 = -60$ bị loại, nhận $x_2 = 30$.'),
        ],
        [
          ex(
            'g9l21-ex1',
            'Football pitch dimensions',
            'Kích thước sân bóng đá mini',
            'A pitch is $30\\text{ m}$ shorter in width than length and has area $1800\\text{ m}^2$. Find its dimensions.',
            'Một sân bóng có chiều rộng ngắn hơn chiều dài $30\\text{ m}$ và diện tích $1800\\text{ m}^2$. Tính kích thước sân.',
            [
              s('Step 1: Let width be $x$', 'Bước 1: Chọn ẩn', 'Let $x\\text{ (m)}$ be the width ($x > 0$). Then the length is $x + 30\\text{ (m)}$.', 'Gọi chiều rộng là $x\\text{ (m)}$ ($x > 0$), chiều dài là $x + 30\\text{ (m)}$.'),
              s('Step 2: Solve $x(x + 30) = 1800$', 'Bước 2: Lập và giải phương trình', '$x^2 + 30x - 1800 = 0 \\Rightarrow x_1 = -60$ (rejected), $x_2 = 30$.', 'Phương trình $x^2 + 30x - 1800 = 0$ cho $x_1 = -60$ (loại), $x_2 = 30$ (nhận).'),
            ],
            'The pitch is $30\\text{ m}$ wide and $60\\text{ m}$ long.',
            'Chiều rộng là $30\\text{ m}$, chiều dài là $60\\text{ m}$.'
          ),
        ],
        ['"Loại" nghiệm dùng "reject", không dùng "cancel". Tốc độ dùng giới từ "at": "travels at 40 km/h".']
      ),
    ]),
    chapter(9, 7, 'Frequency and Relative Frequency', 'Tần số và tần số tương đối', [
      lesson(
        9, 7, 22,
        'Frequency Tables and Frequency Charts',
        'Bảng tần số và biểu đồ tần số',
        ['Count frequencies of each distinct data value and build a frequency table.', 'Represent frequency data with bar charts and identify the most frequent value.'],
        ['Lập bảng tần số từ mẫu số liệu cho trước.', 'Vẽ biểu đồ tần số dạng cột và nhận biết giá trị xuất hiện nhiều nhất.'],
        [
          v('g9l22-v1', 'frequency / sample size', 'n', 'tần số / cỡ mẫu', 'Frequency is the count of occurrences of a value; sample size $N$ is the total count.', 'Tần số là số lần xuất hiện của một giá trị; cỡ mẫu là tổng số quan sát.', 'The Moderate AQI level has a frequency of $12$ out of $30$ days.', 'Mức không khí trung bình có tần số là $12$ trên tổng số $30$ ngày.'),
          v('g9l22-v2', 'frequency table / frequency chart', 'n phr', 'bảng tần số / biểu đồ tần số', 'Structured table or bar chart showing values on the horizontal axis and frequencies on the vertical axis.', 'Bảng thống kê hoặc biểu đồ biểu diễn giá trị và tần số tương ứng.', 'The height of each bar shows the frequency.', 'Chiều cao mỗi cột biểu thị tần số.'),
        ],
        [
          n('g9l22-n1', 'n_1 + n_2 + \\dots + n_k = N', 'the sum of the frequencies equals the sample size N', 'tổng các tần số bằng cỡ mẫu N'),
        ],
        [
          e('g9l22-e1', 'describe', 'The sum of the frequencies equals the sample size.', 'Tổng các tần số bằng cỡ mẫu.'),
          e('g9l22-e2', 'question', 'Which value occurred most frequently according to the chart?', 'Theo biểu đồ, giá trị nào xuất hiện nhiều lần nhất?'),
          e('g9l22-e3', 'present', 'Moderate AQI occurred on $12$ days, which is the greatest frequency.', 'Mức trung bình có tần số $12$, là giá trị lớn nhất.'),
        ],
        [
          ex(
            'g9l22-ex1',
            'Reading an AQI frequency table',
            'Phân tích bảng tần số chỉ số chất lượng không khí',
            'In $30$ days, AQI counts were: Good ($8$), Moderate ($12$), Unhealthy for sensitive groups ($7$), Unhealthy ($3$). Which level occurred most frequently, and on how many days was AQI unhealthy for sensitive groups or worse?',
            'Trong $30$ ngày, số ngày đạt mức Tốt ($8$), Trung bình ($12$), Kém ($7$), Xấu ($3$). Mức nào xuất hiện nhiều nhất và có bao nhiêu ngày từ mức Kém trở lên?',
            [
              s('Step 1: Find highest frequency', 'Bước 1: Tìm tần số lớn nhất', 'Moderate has the greatest frequency ($12$).', 'Mức Trung bình có tần số lớn nhất là $12$.'),
              s('Step 2: Sum target categories', 'Bước 2: Cộng các nhóm yêu cầu', '$7 + 3 = 10$ days.', 'Số ngày từ mức Kém trở lên là $7 + 3 = 10$ ngày.'),
            ],
            'Moderate occurred most frequently; $10$ days were unhealthy for sensitive groups or worse.',
            'Mức Trung bình nhiều nhất; có $10$ ngày chất lượng không khí kém hoặc xấu.'
          ),
        ],
        ['Chú ý: trong tiếng Anh, "observation" là một đơn vị/giá trị quan sát, "data" dùng như danh từ số nhiều hoặc không đếm được ("The data suggest...").']
      ),
      lesson(
        9, 7, 23,
        'Relative Frequency Tables and Relative Frequency Charts',
        'Bảng tần số tương đối và biểu đồ tần số tương đối',
        ['Compute relative frequency $f_i = \\frac{n_i}{N}$ as a decimal or percentage.', 'Use relative frequencies to compare two samples of different sizes fairly.'],
        ['Tính tần số tương đối dưới dạng tỉ số, số thập phân hoặc phần trăm.', 'Dùng tần số tương đối để so sánh công bằng hai mẫu có cỡ mẫu khác nhau.'],
        [
          v('g9l23-v1', 'relative frequency', 'n phr', 'tần số tương đối', 'The ratio of a value’s frequency to the total sample size.', 'Tỉ số giữa tần số của một giá trị và cỡ mẫu.', 'A relative frequency of $\\frac{10}{40} = 0.25$ is $25\\%$.', 'Tần số tương đối $\\frac{10}{40} = 0{,}25$ tức là $25\\%$.'),
          v('g9l23-v2', 'proportion', 'n', 'tỉ lệ', 'The fractional share of a whole represented by a category.', 'Tỉ lệ phần chiếm trong tổng thể mẫu.', 'Compare the two schools using relative frequencies rather than raw frequencies.', 'So sánh hai trường bằng tần số tương đối thay vì tần số thô.'),
        ],
        [
          n('g9l23-n1', 'f = \\frac{n}{N} \\times 100\\%', 'relative frequency equals frequency divided by sample size times one hundred percent', 'tần số tương đối bằng tần số chia cỡ mẫu nhân 100%'),
        ],
        [
          e('g9l23-e1', 'describe', 'The relative frequencies always add up to $1$, or $100\\%$.', 'Tổng các tần số tương đối luôn bằng $1$, tức $100\\%$.'),
          e('g9l23-e2', 'question', 'Why is relative frequency more useful when comparing samples of different sizes?', 'Vì sao tần số tương đối hữu ích hơn khi so sánh các mẫu có kích thước khác nhau?'),
          e('g9l23-e3', 'present', 'At School A, $\\frac{84}{120} = 70\\%$, whereas at School B, $\\frac{96}{160} = 60\\%$.', 'Tại Trường A là $70\\%$, còn tại Trường B là $60\\%$.'),
        ],
        [
          ex(
            'g9l23-ex1',
            'Comparing recycling rates across two schools',
            'So sánh tỉ lệ phân loại rác giữa hai trường',
            'At School A, $84$ of $120$ students separate waste; at School B, $96$ of $160$ do. Which school has the higher proportion?',
            'Ở Trường A có $84/120$ học sinh phân loại rác; Trường B có $96/160$. Trường nào có tỉ lệ cao hơn?',
            [
              s('Step 1: Calculate relative frequencies', 'Bước 1: Tính tần số tương đối', 'School A: $\\frac{84}{120} = 70\\%$; School B: $\\frac{96}{160} = 60\\%$.', 'Trường A: $70\\%$; Trường B: $60\\%$.'),
              s('Step 2: Compare fairly', 'Bước 2: So sánh', 'Even though $96 > 84$, $70\\% > 60\\%$.', 'Tuy $96 > 84$ nhưng xét theo tỉ lệ thì $70\\% > 60\\%$.'),
            ],
            'School A has the greater proportion ($70\\%$).',
            'Trường A có tỉ lệ phân loại rác cao hơn ($70\\%$).'
          ),
        ],
        ['Nhấn mạnh lỗi lập luận thường gặp: so sánh trực tiếp tần số ($84$ vs $96$) khi cỡ mẫu khác nhau là không công bằng.']
      ),
      lesson(
        9, 7, 24,
        'Grouped Frequency and Relative Frequency Tables and Charts',
        'Bảng tần số, tần số tương đối ghép nhóm và biểu đồ',
        ['Group continuous numerical data into half-open intervals $[a, b)$.', 'Interpret grouped histograms and guard against misleading claims like "most" when $< 50\\%$.'],
        ['Ghép nhóm số liệu liên tục vào các nửa khoảng $[a; b)$.', 'Đọc biểu đồ tần số ghép nhóm và đánh giá nhận định thống kê.'],
        [
          v('g9l24-v1', 'class interval / class width', 'n phr', 'nhóm (khoảng lớp) / độ dài nhóm', 'A range $[a, b)$ including $a$ and excluding $b$; width is $b - a$.', 'Nửa khoảng $[a; b)$ chứa $a$ không chứa $b$; độ dài nhóm là $b - a$.', 'The interval $[160, 165)$ has lower boundary $160$, upper boundary $165$, width $5$.', 'Nhóm $[160; 165)$ có đầu mút trái $160$, đầu mút phải $165$, độ dài $5$.'),
          v('g9l24-v2', 'histogram', 'n', 'biểu đồ tần số ghép nhóm', 'A chart with adjacent bars having no gaps representing continuous intervals.', 'Biểu đồ gồm các cột liền kề biểu diễn các nhóm số liệu liên tục.', 'Use adjacent bars when representing grouped numerical data.', 'Dùng các cột kề sát nhau khi vẽ biểu đồ số liệu ghép nhóm.'),
        ],
        [
          n('g9l24-n1', '[a, b)', 'the half-open interval from a to b, including a but excluding b', 'nửa khoảng từ a đến b, lấy a và không lấy b'),
        ],
        [
          e('g9l24-e1', 'describe', 'The interval $[a, b)$ includes $a$ as the lower boundary but does not include $b$.', 'Khoảng $[a; b)$ bao gồm đầu mút trái $a$ nhưng không bao gồm đầu mút phải $b$.'),
          e('g9l24-e2', 'question', 'Does the most frequent interval contain more than half of all observations?', 'Nhóm có tần số lớn nhất có chiếm hơn một nửa số quan sát không?'),
          e('g9l24-e3', 'present', 'Only $21$ out of $60$ students ($35\\%$) are in $[20, 30)$, so it is not the majority.', 'Chỉ có $21/60$ ($35\\%$) học sinh thuộc $[20; 30)$ nên chưa phải đa số.'),
        ],
        [
          ex(
            'g9l24-ex1',
            'Analysing grouped travel times',
            'Phân tích thời gian đi học ghép nhóm',
            'For $60$ students, travel times $[0,10), [10,20), [20,30), [30,40), [40,50)$ have frequencies $6, 18, 21, 10, 5$. How many take $< 30$ min? Is $[20,30)$ "most students"?',
            'Với $60$ học sinh có tần số lần lượt $6, 18, 21, 10, 5$. Có bao nhiêu em đi dưới $30$ phút? Nhóm $[20; 30)$ có phải là "hầu hết học sinh" không?',
            [
              s('Step 1: Sum under 30 min', 'Bước 1: Tính số học sinh đi dưới 30 phút', '$6 + 18 + 21 = 45$ students.', '$6 + 18 + 21 = 45$ học sinh.'),
              s('Step 2: Evaluate claim', 'Bước 2: Kiểm tra nhận định "hầu hết"', '$[20,30)$ has $21$ out of $60$ ($35\\% < 50\\%$), so "most students" is false.', 'Nhóm $[20; 30)$ chỉ chiếm $21/60 = 35\\% < 50\\%$, nên nói "hầu hết" là sai.'),
            ],
            '$45$ students take under $30$ min; Minh’s statement is incorrect.',
            'Có $45$ học sinh đi dưới $30$ phút; nhận định của Minh không đúng.'
          ),
        ],
        ['Khi đọc biểu đồ ghép nhóm ("histogram"), các cột đứng liền sát nhau, khác với biểu đồ cột rời rạc ("bar chart").']
      ),
    ]),
    chapter(9, 8, 'Probability', 'Xác suất của biến cố trong một số mô hình xác suất đơn giản', [
      lesson(
        9, 8, 25,
        'Random Experiments and Sample Spaces',
        'Phép thử ngẫu nhiên và không gian mẫu',
        ['Describe a random experiment and list all outcomes in its sample space $\\Omega$.', 'Use ordered pairs and tree diagrams systematically.'],
        ['Mô tả phép thử ngẫu nhiên và liệt kê không gian mẫu $\\Omega$.', 'Dùng cặp có thứ tự hoặc sơ đồ hình cây để liệt kê đầy đủ kết quả.'],
        [
          v('g9l25-v1', 'random experiment / outcome', 'n phr', 'phép thử ngẫu nhiên / kết quả', 'An experiment whose exact outcome cannot be predicted in advance.', 'Phép thử mà ta không đoán trước được kết quả cụ thể.', 'Tossing two fair coins is a random experiment with $4$ outcomes.', 'Tung hai đồng xu cân đối là phép thử ngẫu nhiên có $4$ kết quả.'),
          v('g9l25-v2', 'sample space ($\\Omega$)', 'n phr', 'không gian mẫu', 'The set $\\Omega$ of all possible outcomes of a random experiment.', 'Tập hợp tất cả các kết quả có thể xảy ra của phép thử.', 'For two coin tosses, $\\Omega = \\{HH, HT, TH, TT\\}$.', 'Khi tung 2 đồng xu, $\\Omega = \\{NN, NS, SN, SS\\}$.'),
          v('g9l25-v3', 'tree diagram', 'n phr', 'sơ đồ hình cây', 'A branching diagram used to list sequential outcomes without missing any.', 'Sơ đồ phân nhánh giúp liệt kê kết quả từng bước không bị sót.', 'Use a tree diagram to avoid missing outcomes.', 'Dùng sơ đồ hình cây để tránh bỏ sót kết quả.'),
        ],
        [
          n('g9l25-n1', '\\Omega = \\{HH, HT, TH, TT\\}', 'omega equals the set of H H, H T, T H, and T T', 'không gian mẫu ô-mê-ga gồm 4 kết quả'),
        ],
        [
          e('g9l25-e1', 'describe', 'The sample space, denoted by $\\Omega$, contains all possible outcomes of the experiment.', 'Không gian mẫu, ký hiệu $\\Omega$, chứa tất cả kết quả có thể của phép thử.'),
          e('g9l25-e2', 'question', 'Does the order of outcomes matter in this experiment?', 'Thứ tự kết quả trong phép thử này có quan trọng không?'),
          e('g9l25-e3', 'present', 'Representing each choice as an ordered pair $(a, b)$, there are $3 \\times 3 = 9$ outcomes.', 'Biểu diễn bằng cặp có thứ tự $(a, b)$, ta có $3 \\times 3 = 9$ kết quả.'),
        ],
        [
          ex(
            'g9l25-ex1',
            'Meal combination sample space',
            'Không gian mẫu bài toán chọn thực đơn',
            'Choose $1$ main dish from $\\{C, N, V\\}$ and $1$ drink from $\\{W, J, M\\}$. Write the sample space $\\Omega$.',
            'Chọn $1$ món chính trong $\\{C, N, V\\}$ và $1$ đồ uống trong $\\{W, J, M\\}$. Viết không gian mẫu $\\Omega$.',
            [
              s('Step 1: Pair systematically', 'Bước 1: Ghép cặp có thứ tự', 'List all pairs $(C,W), (C,J), (C,M), (N,W), (N,J), (N,M), (V,W), (V,J), (V,M)$.', 'Liệt kê 9 cặp $(C,W), \\dots, (V,M)$.'),
            ],
            'There are $n(\\Omega) = 9$ possible outcomes.',
            'Không gian mẫu có $9$ kết quả có thể xảy ra.'
          ),
        ],
        ['Đọc ký hiệu $\\Omega$ là "omega" (chữ cái Hy Lạp viết hoa).']
      ),
      lesson(
        9, 8, 26,
        'Probability of Events Related to a Random Experiment',
        'Xác suất của biến cố liên quan tới phép thử',
        ['Identify favourable outcomes for an event $A$ and verify equal likelihood.', 'Compute $P(A) = \\frac{n(A)}{n(\\Omega)}$ and interpret complements $P(\\text{not } A) = 1 - P(A)$.'],
        ['Liệt kê kết quả thuận lợi cho biến cố $A$ và giải thích tính đồng khả năng.', 'Tính $P(A) = \\frac{n(A)}{n(\\Omega)}$ và biến cố đối.'],
        [
          v('g9l26-v1', 'favourable outcome', 'n phr', 'kết quả thuận lợi', 'An outcome in $\\Omega$ that satisfies the condition defining event $A$.', 'Kết quả thuộc $\\Omega$ làm cho biến cố $A$ xảy ra.', 'For rolling sum $8$ with two dice, there are $5$ favourable outcomes.', 'Với biến cố tổng bằng $8$, có $5$ kết quả thuận lợi.'),
          v('g9l26-v2', 'equally likely outcomes', 'n phr', 'các kết quả đồng khả năng', 'Outcomes that each have the same chance of occurring.', 'Các kết quả có cùng khả năng xảy ra.', 'Each outcome of a fair die is equally likely.', 'Các mặt của con xúc xắc cân đối là đồng khả năng.'),
          v('g9l26-v3', 'complement of an event', 'n phr', 'biến cố đối', 'The event that $A$ does not occur, with probability $1 - P(A)$.', 'Biến cố $A$ không xảy ra, xác suất bằng $1 - P(A)$.', '$P(\\text{not } A) = 1 - P(A)$.', 'Xác suất biến cố đối bằng $1 - P(A)$.'),
        ],
        [
          n('g9l26-n1', 'P(A) = \\frac{n(A)}{n(\\Omega)}', 'the probability of event A equals n of A over n of omega', 'xác suất của biến cố A bằng n A trên n ô-mê-ga'),
        ],
        [
          e('g9l26-e1', 'describe', 'Because the coins or dice are fair, all outcomes in the sample space are equally likely.', 'Vì đồng xu/xúc xắc cân đối nên mọi kết quả đều đồng khả năng.'),
          e('g9l26-e2', 'question', 'How many favourable outcomes satisfy event $A$?', 'Có bao nhiêu kết quả thuận lợi cho biến cố $A$?'),
          e('g9l26-e3', 'present', 'Since $n(A) = 5$ and $n(\\Omega) = 36$, $P(A) = \\frac{5}{36}$.', 'Vì $n(A) = 5$ và $n(\\Omega) = 36$ nên $P(A) = \\frac{5}{36}$.'),
        ],
        [
          ex(
            'g9l26-ex1',
            'Two fair dice summing to 8',
            'Xác suất gieo hai xúc xắc có tổng bằng 8',
            'Two fair dice are rolled. Find the probability that the sum is $8$.',
            'Gieo ngẫu nhiên hai con xúc xắc cân đối. Tính xác suất để tổng số chấm bằng $8$.',
            [
              s('Step 1: Sample space size', 'Bước 1: Tính số phần tử không gian mẫu', 'Each die has $6$ outcomes, so $n(\\Omega) = 6 \\times 6 = 36$ equally likely pairs.', 'Không gian mẫu có $n(\\Omega) = 36$ kết quả đồng khả năng.'),
              s('Step 2: Favourable outcomes', 'Bước 2: Liệt kê kết quả thuận lợi', 'Pairs summing to $8$: $(2,6), (3,5), (4,4), (5,3), (6,2)$, so $n(A) = 5$.', 'Các cặp có tổng bằng $8$ là $(2,6), (3,5), (4,4), (5,3), (6,2)$, có $n(A) = 5$.'),
            ],
            'Therefore $P(A) = \\frac{5}{36}$.',
            'Vậy $P(A) = \\frac{5}{36}$.'
          ),
        ],
        ['Chú ý sửa lỗi đánh máy trong PDF gốc ở Ví dụ 2 (tr.94-95): công thức đúng luôn là $P(W) = \\frac{n(W)}{n(\\Omega)}$, không phải $\\frac{n(\\Omega)}{n(W)}$.']
      ),
    ]),
    chapter(9, 9, 'Circumcircle and Incircle of a Triangle', 'Đường tròn ngoại tiếp và đường tròn nội tiếp', [
      lesson(
        9, 9, 27,
        'Inscribed Angles',
        'Góc nội tiếp',
        ['Identify an inscribed angle and its intercepted arc.', 'Prove and apply $\\angle ACB = \\frac{1}{2}\\angle AOB$, angles in the same segment, and angle in a semicircle ($90^\\circ$).'],
        ['Nhận biết góc nội tiếp và cung bị chắn.', 'Vận dụng tính chất góc nội tiếp bằng nửa góc ở tâm, góc cùng chắn một cung và góc nội tiếp chắn nửa đường tròn.'],
        [
          v('g9l27-v1', 'inscribed angle', 'n phr', 'góc nội tiếp', 'An angle with vertex on the circle whose sides are two chords.', 'Góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung.', '$\\angle ACB$ is an inscribed angle intercepting arc $AB$.', '$\\angle ACB$ là góc nội tiếp chắn cung $AB$.'),
          v('g9l27-v2', 'angles in the same segment', 'n phr', 'các góc cùng chắn một cung', 'Inscribed angles subtending the same arc/chord on the same side are equal.', 'Các góc nội tiếp cùng chắn một cung thì bằng nhau.', 'Since $\\angle ACB$ and $\\angle ADB$ subtend the same chord $AB$, $\\angle ACB = \\angle ADB$.', 'Vì $\\angle ACB$ và $\\angle ADB$ cùng chắn cung $AB$ nên $\\angle ACB = \\angle ADB$.'),
        ],
        [
          n('g9l27-n1', '\\angle ACB = \\frac{1}{2}\\angle AOB', 'angle A C B equals one half of angle A O B', 'góc nội tiếp ACB bằng nửa góc ở tâm AOB'),
        ],
        [
          e('g9l27-e1', 'describe', 'An angle subtended by a diameter at any point on the circle is a right angle ($90^\\circ$).', 'Góc nội tiếp chắn nửa đường tròn là góc vuông ($90^\\circ$).'),
          e('g9l27-e2', 'question', 'Which arc does inscribed angle $\\angle ACB$ intercept?', 'Góc nội tiếp $\\angle ACB$ chắn cung nào?'),
          e('g9l27-e3', 'present', 'Both $\\angle ACB$ and $\\angle ADB$ intercept minor arc $AB$, so $\\angle ACB = \\angle ADB = 62^\\circ$.', 'Cả $\\angle ACB$ và $\\angle ADB$ đều chắn cung nhỏ $AB$ nên đều bằng $62^\\circ$.'),
        ],
        [
          ex(
            'g9l27-ex1',
            'Constant viewing angle along a circular track',
            'Góc nhìn không đổi trên cung tròn',
            'Camera $C$ slides on major arc $AB$ with central angle $\\angle AOB = 124^\\circ$. Find viewing angle $\\angle ACB$ and explain why it stays constant at point $D$.',
            'Camera $C$ trượt trên cung lớn $AB$ có góc ở tâm $\\angle AOB = 124^\\circ$. Tính $\\angle ACB$ và giải thích vì sao góc nhìn tại $D$ không đổi.',
            [
              s('Step 1: Inscribed-central relation', 'Bước 1: Dùng định lí góc nội tiếp', '$\\angle ACB = \\frac{1}{2}\\angle AOB = 62^\\circ$.', '$\\angle ACB = \\frac{1}{2}\\angle AOB = 62^\\circ$.'),
              s('Step 2: Same segment', 'Bước 2: Góc cùng chắn một cung', 'At any point $D$ on major arc $AB$, $\\angle ADB = \\frac{1}{2}\\angle AOB = 62^\\circ$.', 'Tại điểm $D$ cùng trên cung lớn $AB$, $\\angle ADB = \\angle ACB = 62^\\circ$.'),
            ],
            'The viewing angle stays constant at $62^\\circ$.',
            'Góc nhìn luôn không đổi bằng $62^\\circ$.'
          ),
        ],
        ['Anh-Anh dùng "circle" (đường tròn) và nói "angle at the circumference" tương đương với "inscribed angle".']
      ),
      lesson(
        9, 9, 28,
        'Circumcircle and Incircle of a Triangle',
        'Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác',
        ['Distinguish circumcentre (perpendicular bisectors, equidistant to vertices) from incentre (angle bisectors, equidistant to sides).', 'Compute circumradius $R$ of a right triangle and inradius $r = \\frac{\\text{Area}}{s}$.'],
        ['Phân biệt tâm ngoại tiếp (giao ba đường trung trực) với tâm nội tiếp (giao ba đường phân giác).', 'Tính bán kính ngoại tiếp $R$ tam giác vuông và bán kính nội tiếp $r = \\frac{S}{p}$.'],
        [
          v('g9l28-v1', 'circumcircle / circumcentre / circumradius', 'n', 'đường tròn ngoại tiếp / tâm ngoại tiếp / bán kính ngoại tiếp', 'Circle passing through all three vertices; centre is the intersection of perpendicular bisectors.', 'Đường tròn đi qua 3 đỉnh; tâm là giao 3 đường trung trực.', 'In a right triangle, the circumcentre is the midpoint of the hypotenuse.', 'Trong tam giác vuông, tâm đường tròn ngoại tiếp là trung điểm cạnh huyền.'),
          v('g9l28-v2', 'incircle / incentre / inradius', 'n', 'đường tròn nội tiếp / tâm nội tiếp / bán kính nội tiếp', 'Circle tangent to all three sides; centre is the intersection of internal angle bisectors.', 'Đường tròn tiếp xúc với 3 cạnh; tâm là giao 3 đường phân giác trong.', 'For an equilateral triangle, the circumcentre and incentre coincide.', 'Trong tam giác đều, tâm ngoại tiếp và tâm nội tiếp trùng nhau.'),
        ],
        [
          n('g9l28-n1', 'OA = OB = OC = R', 'O A equals O B equals O C equals the circumradius R', 'tâm ngoại tiếp O cách đều ba đỉnh một khoảng bằng R'),
          n('g9l28-n2', '\\text{Area} = r \\cdot s', 'area equals inradius r times semiperimeter s', 'diện tích tam giác bằng bán kính nội tiếp nhân nửa chu vi'),
        ],
        [
          e('g9l28-e1', 'describe', 'Key distinction: circumcentre gives equal distances to vertices; incentre gives equal perpendicular distances to sides.', 'Phân biệt nhanh: tâm ngoại tiếp cách đều 3 đỉnh; tâm nội tiếp cách đều 3 cạnh.'),
          e('g9l28-e2', 'question', 'Can the circumcentre lie outside a triangle?', 'Tâm đường tròn ngoại tiếp có thể nằm ngoài tam giác không? (Có, với tam giác tù).'),
          e('g9l28-e3', 'present', 'Since $ABC$ is right-angled at $A$, the circumcentre is the midpoint of $BC$ with $R = 5\\text{ m}$.', 'Vì $\\triangle ABC$ vuông tại $A$ nên tâm ngoại tiếp là trung điểm $BC$ và $R = 5\\text{ m}$.'),
        ],
        [
          ex(
            'g9l28-ex1',
            'Sprinkler placement in a 6-8-10 courtyard',
            'Đặt tâm ngoại tiếp và tâm nội tiếp trong sân tam giác vuông',
            'A courtyard $ABC$ is right-angled at $A$ with $AB = 6\\text{ m}, AC = 8\\text{ m}$. Locate the centre equidistant from $A, B, C$ and find its radius; state which centre touches all three sides.',
            'Sân tam giác $ABC$ vuông tại $A$ có $AB = 6\\text{ m}, AC = 8\\text{ m}$. Xác định tâm và bán kính vòng tròn đi qua 3 đỉnh; nêu tên tâm vòng tròn tiếp xúc 3 cạnh.',
            [
              s('Step 1: Circumcentre', 'Bước 1: Xác định tâm ngoại tiếp', '$BC = \\sqrt{6^2 + 8^2} = 10\\text{ m}$. Circumcentre $O$ is the midpoint of $BC$, $R = 5\\text{ m}$.', 'Cạnh huyền $BC = 10\\text{ m}$, nên tâm ngoại tiếp $O$ là trung điểm $BC$, $R = 5\\text{ m}$.'),
              s('Step 2: Incentre', 'Bước 2: Xác định tâm nội tiếp', 'To touch all three sides, use the incentre (intersection of angle bisectors), $r = \\frac{\\text{Area}}{s} = \\frac{24}{12} = 2\\text{ m}$.', 'Đường tròn tiếp xúc 3 cạnh có tâm là giao ba đường phân giác trong, bán kính $r = \\frac{24}{12} = 2\\text{ m}$.'),
            ],
            'Circumradius $R = 5\\text{ m}$; incentre for tangent circle ($r = 2\\text{ m}$).',
            'Tâm ngoại tiếp là trung điểm $BC$ ($R = 5\\text{ m}$); bồn hoa tiếp xúc 3 cạnh đặt tại tâm nội tiếp.'
          ),
        ],
        ['Cẩn thận nhầm giữa "perpendicular bisector" (đường trung trực) và "angle bisector" (đường phân giác).']
      ),
      lesson(
        9, 9, 29,
        'Cyclic Quadrilaterals',
        'Tứ giác nội tiếp',
        ['State and prove the supplementary opposite-angles property of cyclic quadrilaterals.', 'Identify rectangles, squares, and quadrilaterals with $\\angle A + \\angle C = 180^\\circ$ as cyclic.'],
        ['Nêu tính chất tổng hai góc đối bằng $180^\\circ$ của tứ giác nội tiếp.', 'Vận dụng dấu hiệu nhận biết để chứng minh tứ giác nội tiếp.'],
        [
          v('g9l29-v1', 'cyclic quadrilateral', 'n phr', 'tứ giác nội tiếp', 'A quadrilateral whose four vertices all lie on the same circle.', 'Tứ giác có bốn đỉnh cùng nằm trên một đường tròn.', 'Since $\\angle ABC + \\angle ADC = 180^\\circ$, $ABCD$ is cyclic.', 'Vì $\\angle ABC + \\angle ADC = 180^\\circ$ nên $ABCD$ là tứ giác nội tiếp.'),
          v('g9l29-v2', 'supplementary angles', 'n phr', 'hai góc bù nhau', 'Two angles whose measures add up to $180^\\circ$.', 'Hai góc có tổng số đo bằng $180^\\circ$.', 'Opposite angles of a cyclic quadrilateral are supplementary.', 'Hai góc đối của tứ giác nội tiếp bù nhau.'),
        ],
        [
          n('g9l29-n1', '\\angle A + \\angle C = 180^\\circ', 'angle A plus angle C equals one hundred and eighty degrees', 'tổng hai góc đối A và C bằng 180 độ'),
        ],
        [
          e('g9l29-e1', 'describe', 'Every rectangle is cyclic, with circumcentre at the intersection of its diagonals.', 'Mọi hình chữ nhật đều nội tiếp đường tròn có tâm là giao điểm hai đường chéo.'),
          e('g9l29-e2', 'question', 'Why is knowing $\\angle P + \\angle Q = 180^\\circ$ not enough to prove $PQRS$ is cyclic?', 'Vì sao chỉ biết tổng hai góc kề $\\angle P + \\angle Q = 180^\\circ$ không đủ kết luận nội tiếp?'),
          e('g9l29-e3', 'present', 'For a square of side $a$, the circumradius is $\\frac{a\\sqrt{2}}{2}$.', 'Với hình vuông cạnh $a$, bán kính đường tròn ngoại tiếp là $\\frac{a\\sqrt{2}}{2}$.'),
        ],
        [
          ex(
            'g9l29-ex1',
            'Circular frame around a rectangular window',
            'Khung tròn ngoại tiếp cửa sổ hình chữ nhật',
            'A rectangular window $ABCD$ is $1.2\\text{ m}$ wide and $0.9\\text{ m}$ high. Find the centre and radius of the circle passing through all four corners.',
            'Cửa sổ hình chữ nhật $ABCD$ rộng $1{,}2\\text{ m}$, cao $0{,}9\\text{ m}$. Tìm tâm và bán kính đường tròn đi qua bốn đỉnh.',
            [
              s('Step 1: Verify cyclicity', 'Bước 1: Giải thích nội tiếp', 'Every angle is $90^\\circ$, so opposite angles sum to $180^\\circ$. Centre $O$ is the diagonal intersection.', 'Mỗi góc bằng $90^\\circ$ nên hai góc đối bù nhau. Tâm $O$ là giao điểm hai đường chéo.'),
              s('Step 2: Compute radius', 'Bước 2: Tính bán kính', 'Diagonal $= \\sqrt{1.2^2 + 0.9^2} = 1.5\\text{ m}$, so $R = 0.75\\text{ m}$.', 'Đường chéo dài $\\sqrt{1{,}2^2 + 0{,}9^2} = 1{,}5\\text{ m} \\Rightarrow R = 0{,}75\\text{ m}$.'),
            ],
            'The circumcentre is the intersection of the diagonals and $R = 0.75\\text{ m}$.',
            'Tâm là giao điểm hai đường chéo, bán kính $0{,}75\\text{ m}$.'
          ),
        ],
        ['Chú ý dùng đúng cặp góc đối ("opposite angles"); hai góc kề cùng phía bù nhau chỉ cho ra hình thang.']
      ),
      lesson(
        9, 9, 30,
        'Regular Polygons',
        'Đa giác đều',
        ['Calculate central, interior, and exterior angles of a regular $n$-gon.', 'Describe rotational symmetry of order $n$ with smallest rotation $\\frac{360^\\circ}{n}$.'],
        ['Tính góc ở tâm, góc trong và góc ngoài của đa giác đều $n$ cạnh.', 'Mô tả phép quay $\\frac{360^\\circ}{n}$ giữ nguyên đa giác đều.'],
        [
          v('g9l30-v1', 'regular polygon', 'n phr', 'đa giác đều', 'A closed plane polygon with all sides equal and all interior angles equal.', 'Đa giác lồi có tất cả các cạnh bằng nhau và các góc bằng nhau.', 'A regular hexagon has $6$ equal sides and $120^\\circ$ interior angles.', 'Lục giác đều có $6$ cạnh bằng nhau và mỗi góc trong bằng $120^\\circ$.'),
          v('g9l30-v2', 'rotational symmetry', 'n phr', 'đối xứng quay', 'Rotations about the centre by multiples of $\\frac{360^\\circ}{n}$ that map the polygon onto itself.', 'Phép quay quanh tâm một góc $\\frac{360^\\circ}{n}$ biến đa giác thành chính nó.', 'A rotation of $60^\\circ$ maps a regular hexagon onto itself.', 'Phép quay $60^\\circ$ biến lục giác đều thành chính nó.'),
        ],
        [
          n('g9l30-n1', '\\text{Interior angle} = 180^\\circ - \\frac{360^\\circ}{n}', 'each interior angle equals one hundred and eighty degrees minus three hundred and sixty degrees over n', 'mỗi góc trong của đa giác đều n cạnh bằng 180 độ trừ 360 độ chia n'),
        ],
        [
          e('g9l30-e1', 'describe', 'For an inscribed regular $n$-gon, the central angle, exterior angle, and smallest positive rotational step are all $\\frac{360^\\circ}{n}$.', 'Với đa giác đều $n$ cạnh, góc ở tâm, góc ngoài và góc quay nhỏ nhất đều bằng $\\frac{360^\\circ}{n}$.'),
          e('g9l30-e2', 'question', 'What is the smallest positive rotation mapping a regular $12$-gon onto itself?', 'Góc quay dương nhỏ nhất biến đa giác đều 12 cạnh thành chính nó là bao nhiêu?'),
          e('g9l30-e3', 'present', 'Each central angle is $\\frac{360^\\circ}{12} = 30^\\circ$, and each interior angle is $150^\\circ$.', 'Góc ở tâm bằng $30^\\circ$ và mỗi góc trong bằng $150^\\circ$.'),
        ],
        [
          ex(
            'g9l30-ex1',
            'Angles and side length of a regular dodecagon',
            'Góc và cạnh của đa giác đều 12 cạnh',
            'A regular $12$-gon is inscribed in a circle of radius $6\\text{ cm}$. Find its central angle, interior angle, and side length.',
            'Đa giác đều $12$ cạnh nội tiếp đường tròn bán kính $6\\text{ cm}$. Tìm góc ở tâm, góc trong và độ dài cạnh.',
            [
              s('Step 1: Find angles', 'Bước 1: Tính các góc', 'Central angle $= \\frac{360^\\circ}{12} = 30^\\circ$; exterior $= 30^\\circ$; interior $= 180^\\circ - 30^\\circ = 150^\\circ$.', 'Góc ở tâm bằng $30^\\circ$, góc trong bằng $150^\\circ$.'),
              s('Step 2: Side length', 'Bước 2: Tính cạnh', 'In isosceles $\\triangle OAB$ ($OA = OB = 6, \\angle AOB = 30^\\circ$), bisecting gives $AB = 12\\sin 15^\\circ\\text{ cm}$.', 'Kẻ đường cao của tam giác cân $OAB$ ta được $AB = 12\\sin 15^\\circ\\text{ cm}$.'),
            ],
            'Central angle $30^\\circ$, interior angle $150^\\circ$, rotation step $30^\\circ$.',
            'Góc ở tâm $30^\\circ$, góc trong $150^\\circ$, góc quay nhỏ nhất $30^\\circ$.'
          ),
        ],
        ['Chú ý tên gọi số cạnh: pentagon (5), hexagon (6), octagon (8), nonagon (9), decagon (10), dodecagon (12).']
      ),
    ]),
    chapter(9, 10, 'Solid Shapes in Everyday Life', 'Một số hình khối trong thực tiễn', [
      lesson(
        9, 10, 31,
        'Cylinders and Cones',
        'Hình trụ và hình nón',
        ['Distinguish a cylinder’s generating line ($= h$) from a cone’s slant height ($l = \\sqrt{R^2 + h^2}$).', 'Calculate lateral area and volume of cylinders ($2\\pi Rh, \\pi R^2h$) and cones ($\\pi Rl, \\frac{1}{3}\\pi R^2h$).'],
        ['Phân biệt đường sinh hình trụ ($= h$) và đường sinh hình nón ($l = \\sqrt{R^2 + h^2}$).', 'Tính diện tích xung quanh và thể tích hình trụ, hình nón.'],
        [
          v('g9l31-v1', 'cylinder / generating line', 'n phr', 'hình trụ / đường sinh của hình trụ', 'A solid with two parallel circular bases; each generating line equals height $h$.', 'Hình tạo bởi hai đáy tròn bằng nhau; đường sinh bằng chiều cao $h$.', 'The lateral surface of a cylinder unrolls into a rectangle of area $2\\pi Rh$.', 'Mặt xung quanh hình trụ khai triển thành hình chữ nhật diện tích $2\\pi Rh$.'),
          v('g9l31-v2', 'cone / slant height / apex', 'n phr', 'hình nón / đường sinh / đỉnh', 'A solid tapering from a circular base to an apex $S$, with slant height $l$.', 'Hình có đáy tròn và đỉnh $S$, đường sinh là $l$.', 'The lateral area of a cone is $S_{\\text{lat}} = \\pi Rl$.', 'Diện tích xung quanh hình nón là $S_{xq} = \\pi Rl$.'),
        ],
        [
          n('g9l31-n1', 'V = \\frac{1}{3}\\pi R^2 h', 'V equals one-third pi R squared h', 'thể tích hình nón V bằng một phần ba pi R bình phương h'),
          n('g9l31-n2', 'S_{\\text{lat}} = 2\\pi Rh', 'lateral area S equals two pi R h', 'diện tích xung quanh bằng 2 pi R h'),
        ],
        [
          e('g9l31-e1', 'describe', 'For a cone, radius $R$, height $h$, and slant height $l$ form a right triangle ($h^2 + R^2 = l^2$).', 'Trong hình nón, bán kính $R$, chiều cao $h$ và đường sinh $l$ lập thành tam giác vuông.'),
          e('g9l31-e2', 'question', 'What is the difference between the vertical height and the slant height of a cone?', 'Chiều cao và đường sinh của hình nón khác nhau ở điểm nào?'),
          e('g9l31-e3', 'present', 'By Pythagoras, $h = \\sqrt{10^2 - 6^2} = 8\\text{ cm}$, so $V = \\frac{1}{3}\\pi \\cdot 6^2 \\cdot 8 = 96\\pi\\text{ cm}^3$.', 'Tính được $h = 8\\text{ cm}$, suy ra $V = 96\\pi\\text{ cm}^3$.'),
        ],
        [
          ex(
            'g9l31-ex1',
            'Cylinder bin and cone calculations',
            'Tính diện tích sơn thùng trụ và thể tích hình nón',
            'A cone has slant height $10\\text{ cm}$ and base radius $6\\text{ cm}$. Find its lateral area and volume.',
            'Một hình nón có đường sinh $10\\text{ cm}$ và bán kính đáy $6\\text{ cm}$. Tính diện tích xung quanh và thể tích.',
            [
              s('Step 1: Lateral area', 'Bước 1: Diện tích xung quanh', '$S_{\\text{lat}} = \\pi Rl = \\pi \\cdot 6 \\cdot 10 = 60\\pi\\text{ cm}^2$.', '$S_{xq} = \\pi Rl = 60\\pi\\text{ cm}^2$.'),
              s('Step 2: Height and volume', 'Bước 2: Chiều cao và thể tích', '$h = \\sqrt{10^2 - 6^2} = 8\\text{ cm}$; $V = \\frac{1}{3}\\pi \\cdot 6^2 \\cdot 8 = 96\\pi\\text{ cm}^3$.', 'Tính $h = 8\\text{ cm}$, suy ra $V = \\frac{1}{3}\\pi \\cdot 36 \\cdot 8 = 96\\pi\\text{ cm}^3$.'),
            ],
            'Lateral area $= 60\\pi\\text{ cm}^2$, volume $= 96\\pi\\text{ cm}^3$.',
            '$S_{xq} = 60\\pi\\text{ cm}^2$, thể tích $V = 96\\pi\\text{ cm}^3$.'
          ),
        ],
        ['Chú ý phân biệt thuật ngữ: đường sinh hình trụ thường dùng "generating line", còn đường sinh hình nón dùng "slant height".']
      ),
      lesson(
        9, 10, 32,
        'Spheres',
        'Hình cầu',
        ['Distinguish spherical surface (surface) from solid sphere/ball (volume) and identify great circles.', 'Compute surface area $S = 4\\pi R^2$ and volume $V = \\frac{4}{3}\\pi R^3$.'],
        ['Phân biệt mặt cầu và hình cầu, nhận biết đường tròn lớn.', 'Tính diện tích mặt cầu $4\\pi R^2$ và thể tích hình cầu $\\frac{4}{3}\\pi R^3$.'],
        [
          v('g9l32-v1', 'sphere / spherical surface / ball', 'n', 'hình cầu / mặt cầu', 'Points at distance $R$ from centre $O$ form the spherical surface; the solid inside is a solid sphere/ball.', 'Mặt cầu là bề mặt cách tâm $O$ khoảng $R$; hình cầu gồm cả phần bên trong.', 'Rotating a semicircular region about its diameter produces a solid sphere.', 'Quay nửa hình tròn quanh đường kính tạo ra hình cầu.'),
          v('g9l32-v2', 'great circle / hemisphere', 'n phr', 'đường tròn lớn / bán cầu', 'A plane through the sphere’s centre creates a great circle of radius $R$ and two hemispheres.', 'Mặt phẳng đi qua tâm cắt mặt cầu theo đường tròn lớn và chia hình cầu thành hai bán cầu.', 'The Equator is modelled as a great circle of the Earth.', 'Đường xích đạo được mô hình hóa như một đường tròn lớn của Trái Đất.'),
        ],
        [
          n('g9l32-n1', 'S = 4\\pi R^2', 'S equals four pi R squared', 'diện tích mặt cầu S bằng 4 pi R bình phương'),
          n('g9l32-n2', 'V = \\frac{4}{3}\\pi R^3', 'V equals four-thirds pi R cubed', 'thể tích hình cầu V bằng bốn phần ba pi R lập phương'),
        ],
        [
          e('g9l32-e1', 'describe', 'The cross-section of a sphere cut by any plane is a circle; if the plane passes through the centre, it is a great circle.', 'Mặt cắt hình cầu bởi một mặt phẳng là hình tròn; qua tâm là đường tròn lớn.'),
          e('g9l32-e2', 'question', 'Why can a sphere not have an exact planar net?', 'Vì sao mặt cầu không thể trải phẳng chính xác thành hình khai triển phẳng?'),
          e('g9l32-e3', 'present', 'For diameter $20\\text{ cm}$, radius $R = 10\\text{ cm}$ and $V = \\frac{4}{3}\\pi \\cdot 10^3 = \\frac{4000\\pi}{3}\\text{ cm}^3$.', 'Với đường kính $20\\text{ cm}$, $R = 10\\text{ cm}$ và $V = \\frac{4000\\pi}{3}\\text{ cm}^3$.'),
        ],
        [
          ex(
            'g9l32-ex1',
            'Volume of a two-thirds spherical fish bowl',
            'Thể tích bể cá bằng hai phần ba hình cầu',
            'A fish bowl is $\\frac{2}{3}$ of a sphere with diameter $20\\text{ cm}$. Find its volume to the nearest $\\text{cm}^3$.',
            'Một bể cá có dạng $\\frac{2}{3}$ hình cầu đường kính $20\\text{ cm}$. Tính thể tích làm tròn đến $\\text{cm}^3$.',
            [
              s('Step 1: Find radius and full sphere volume', 'Bước 1: Tìm bán kính và thể tích hình cầu', '$R = 10\\text{ cm}$, $V_{\\text{sphere}} = \\frac{4}{3}\\pi(10)^3 = \\frac{4000\\pi}{3}\\text{ cm}^3$.', '$R = 10\\text{ cm}$, $V_{cầu} = \\frac{4000\\pi}{3}\\text{ cm}^3$.'),
              s('Step 2: Multiply by 2/3', 'Bước 2: Nhân với 2/3', '$V = \\frac{2}{3} \\cdot \\frac{4000\\pi}{3} = \\frac{8000\\pi}{9} \\approx 2793\\text{ cm}^3$.', '$V = \\frac{8000\\pi}{9} \\approx 2793\\text{ cm}^3$.'),
            ],
            'The fish bowl holds approximately $2793\\text{ cm}^3$.',
            'Thể tích bể cá xấp xỉ $2793\\text{ cm}^3$.'
          ),
        ],
        ['Chú ý: $\\frac{4}{3}$ đọc là "four-thirds"; trong toán học chặt chẽ, "sphere" là mặt cầu, còn "ball/solid sphere" là khối cầu.']
      ),
    ]),
  ],
};
