using Microsoft.AspNetCore.Mvc;
using RecipesNotebookServer.Models.DTOs;
using RecipesNotebookServer.Models.Entities;
using RecipesNotebookServer.Models.RequestBodies;
using RecipesNotebookServer.Repository.UserRepository;
using System;
using System.Security.Cryptography;
using System.Text;

namespace RecipesNotebookServer.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            IEnumerable<UserDTO> users = (await _userRepository.GetUsers())
                .Select(user => new UserDTO { Email = user.Email, Name = user.Name });

            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody] UserLoginRequestBodyDTO userRequestBody)
        {
            User? user = await _userRepository.GetUserByEmail(userRequestBody.Email);

            if (user == null)
            {
                return NotFound("User not found!");
            }

            string possiblePassword = userRequestBody.Password + user.Salt;
            string possibleHashedPassword = ComputeSHA256Hash(possiblePassword);

            if (possibleHashedPassword != user.HashedPassword)
            {
                return Unauthorized("Password is incorrect!");
            }

            return Ok(
                new UserDTO
                {
                    Email = user.Email,
                    Name = user.Name,
                }
            );
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody] UserRegisterRequestBody userRequestBody)
        {
            User? user = await _userRepository.GetUserByEmail(userRequestBody.Email);

            if (user != null)
            {
                return Conflict("An accout with this email already exists!");
            }

            string salt = GenerateRandomString(16);
            string hashedPassword = ComputeSHA256Hash(userRequestBody.Password + salt);

            user = await _userRepository.AddUser(userRequestBody.Email, userRequestBody.Name, hashedPassword, salt);

            return Ok(
                new UserDTO
                {
                    Email = user.Email,
                    Name = user.Name,
                }
            );
        }

        private static string ComputeSHA256Hash(string input)
        {
            string hash = String.Empty;

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = sha256.ComputeHash(inputBytes);

                foreach (byte b in hashBytes)
                {
                    hash += $"{b:x2}";
                }

            }
            return hash;
        }

        private static string GenerateRandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            var result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(chars[random.Next(chars.Length)]);
            }
            return result.ToString();
        }
    }
}
